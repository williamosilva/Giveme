// src/hooks/useFileOperations.ts
import { useMutation } from "react-query";
import api from "@services/ApiService";
// Hook for Upload
const uploadFile = async ({ file, }) => {
    const formData = new FormData();
    formData.append("file", file);
    // The token refresh logic is handled in the API service,
    // so we can just call the API directly.
    const response = await api.post("/file/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const useUploadFile = () => {
    const uploadMutation = useMutation(uploadFile);
    const mutate = async (params) => {
        try {
            const uploadResponse = await uploadMutation.mutateAsync(params);
            return uploadResponse;
        }
        catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.Erro || "Unknown error";
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
// Hook for Delete
const deleteFile = async (fileId) => {
    const response = await api.delete(`/file/delete/${fileId}`);
    return response.data;
};
export const useDeleteFile = () => {
    const deleteMutation = useMutation(deleteFile);
    const mutate = (fileId, options) => {
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
