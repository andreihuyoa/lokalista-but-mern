import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, refreshToken } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

export const withTokenRefresh = (WrappedComponent) => {
  return function WithTokenRefreshComponent(props) {
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
      const interceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response?.status === 401 && error.response?.data?.shouldRefresh) {
            try {
              await refreshToken();
              toast({
                title: "Session Refreshed",
                description: "Your session has been renewed",
                variant: "default",
              });
              return api(error.config);
            } catch (refreshError) {
              toast({
                title: "Session Expired",
                description: "Please login again.",
                variant: "destructive",
              });
              navigate("/login");
              return Promise.reject(refreshError);
            }
          }
          return Promise.reject(error);
        }
      );
      return () => {
        api.interceptors.response.eject(interceptor);
      };
    }, [navigate, toast]);
    return <WrappedComponent {...props} />;
  };
};
