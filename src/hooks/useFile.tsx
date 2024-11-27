// src/hooks/useFileOperations.ts

import { useMutation } from "react-query";
import api from "@services/ApiService";

// Types
interface UploadFileParams {
  file: File;
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
}: UploadFileParams): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  // A chamada para a API, lidando com upload
  const response = await api.post<UploadResponse>("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useUploadFile = () => {
  const uploadMutation = useMutation(uploadFile);

  const mutate = async (params: UploadFileParams) => {
    try {
      const uploadResponse = await uploadMutation.mutateAsync(params);
      return uploadResponse;
    } catch (error: any) {
      if (error.response) {
        // Acesse a mensagem de erro do backend, se disponível
        const backendErrorMessage =
          error.response.data.error ||
          error.response.data.message ||
          "Unknown error";
        throw new Error(backendErrorMessage);
      }
      // Caso não tenha uma resposta do servidor
      throw error;
    }
  };

  return {
    mutate,
    isLoading: uploadMutation.isLoading,
    isError: uploadMutation.isError,
    isSuccess: uploadMutation.isSuccess,
    error: uploadMutation.error,
    data: uploadMutation.data,
    reset: uploadMutation.reset,
  };
};

// Hook for Delete
const deleteFile = async (fileId: string) => {
  const response = await api.delete(`/file/delete/${fileId}`);
  return response.data;
};

export const useDeleteFile = () => {
  const deleteMutation = useMutation(deleteFile);

  const mutate = (fileId: string, options?: { onSuccess?: () => void }) => {
    return deleteMutation.mutate(fileId, {
      onSuccess: () => {
        if (options?.onSuccess) {
          options.onSuccess();
        }
      },
      onError: (error) => {
        throw error;
      },
    });
  };

  return {
    mutate,
    isLoading: deleteMutation.isLoading,
    isError: deleteMutation.isError,
    isSuccess: deleteMutation.isSuccess,
    error: deleteMutation.error,
    data: deleteMutation.data,
    reset: deleteMutation.reset,
  };
};
