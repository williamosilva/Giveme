import axios from "axios";
import { useMutation } from "react-query";
import { isTokenExpired, refreshAccessToken } from "../hooks/useToken";

interface UploadFileParams {
  file: File;
  token: string;
}

interface UploadResponse {
  message: string;
  uploadsRestantes: number;
  uploadInfo: {
    kind: string;
    id: string;
    name: string;
    mimeType: string;
    link: string;
  };
}

const uploadFile = async ({
  file,
  token,
}: UploadFileParams): Promise<UploadResponse> => {
  // Verifique se o token expirou
  if (!token || isTokenExpired(token)) {
    // console.log("Token expirado, tentando renovar...");
    token = await refreshAccessToken();
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadResponse>(
    "http://localhost:3000/file/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useUploadFile = () => {
  const uploadMutation = useMutation(uploadFile);

  const mutate = async (params: UploadFileParams) => {
    try {
      const uploadResponse = await uploadMutation.mutateAsync(params);
      return uploadResponse;
    } catch (error) {
      // Captura a mensagem de erro do backend
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.Erro || "Erro desconhecido";
        throw new Error(errorMessage);
      }
      throw error;
    }
  };

  const reset = () => {
    uploadMutation.reset();
  };

  return {
    mutate,
    isLoading: uploadMutation.isLoading,
    isError: uploadMutation.isError,
    isSuccess: uploadMutation.isSuccess,
    error: uploadMutation.error,
    data: uploadMutation.data,
    reset,
  };
};

const deleteFile = async (fileId: string) => {
  let token = localStorage.getItem("accessToken");

  // Verifique se o token expirou
  if (!token || isTokenExpired(token)) {
    // console.log("Token expirado, tentando renovar...");
    token = await refreshAccessToken();
  }

  const response = await axios.delete(
    `http://localhost:3000/file/delete/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useDeleteFile = () => {
  const deleteMutation = useMutation(deleteFile);

  const mutate = (fileId: string, options?: { onSuccess?: () => void }) => {
    return deleteMutation.mutate(fileId, {
      onSuccess: (data) => {
        if (options?.onSuccess) {
          options.onSuccess();
        }
      },
      onError: (error) => {
        throw error;
      },
    });
  };

  const reset = () => {
    deleteMutation.reset();
  };

  return {
    mutate,
    isLoading: deleteMutation.isLoading,
    isError: deleteMutation.isError,
    isSuccess: deleteMutation.isSuccess,
    error: deleteMutation.error,
    data: deleteMutation.data,
    reset,
  };
};
