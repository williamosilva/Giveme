// src/hooks/useFileOperations.ts

import { useMutation } from "react-query";
import api from "../services/api";

// Tipos
interface UploadFileParams {
  file: File;
  token: string; // Mantido para compatibilidade, mas não será usado
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

// Hook de Upload
const uploadFile = async ({
  file,
}: UploadFileParams): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

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
        const errorMessage = error.response.data.Erro || "Erro desconhecido";
        throw new Error(errorMessage);
      }
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

// Hook de Delete
const deleteFile = async (fileId: string) => {
  const response = await api.delete(`/file/delete/${fileId}`);
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
