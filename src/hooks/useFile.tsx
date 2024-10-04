import axios from "axios";
import { useMutation } from "react-query";

// Interfaces
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
  };
}

interface CreatePublicUrlParams {
  fileId: string;
  token: string;
}

interface PublicUrlResponse {
  webViewLink: string;
  webContentLink: string;
}

// Hook de Upload
const uploadFile = async ({
  file,
  token,
}: UploadFileParams): Promise<UploadResponse> => {
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

// Hook de Geração de URL Pública
const createPublicUrl = async ({
  fileId,
  token,
}: CreatePublicUrlParams): Promise<PublicUrlResponse> => {
  const response = await axios.get<PublicUrlResponse>(
    `http://localhost:3000/file/public-url/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Hook combinado
export const useUploadAndCreatePublicUrl = () => {
  const uploadMutation = useMutation(uploadFile);
  const createPublicUrlMutation = useMutation(createPublicUrl);

  const mutate = async (params: UploadFileParams) => {
    try {
      // Primeiro, faz o upload
      const uploadResponse = await uploadMutation.mutateAsync(params);

      // Se o upload for bem-sucedido, gera a URL pública
      if (uploadResponse.uploadInfo.id) {
        const publicUrlResponse = await createPublicUrlMutation.mutateAsync({
          fileId: uploadResponse.uploadInfo.id,
          token: params.token,
        });

        return {
          uploadResponse,
          publicUrlResponse,
        };
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    mutate,
    isLoading: uploadMutation.isLoading || createPublicUrlMutation.isLoading,
    isError: uploadMutation.isError || createPublicUrlMutation.isError,
    isSuccess: uploadMutation.isSuccess && createPublicUrlMutation.isSuccess,
    error: uploadMutation.error || createPublicUrlMutation.error,
    uploadProgress: uploadMutation.isLoading ? "Fazendo upload..." : "",
    urlProgress: createPublicUrlMutation.isLoading
      ? "Gerando URL pública..."
      : "",
    // Adicionando os dados das respostas
    data:
      uploadMutation.data && createPublicUrlMutation.data
        ? {
            uploadResponse: uploadMutation.data,
            publicUrlResponse: createPublicUrlMutation.data,
          }
        : undefined,
  };
};
