import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { type AuthResponse } from "@shared/types";

// Google Sign-In component that works with Google Identity Services
export function GoogleSignIn() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const googleSignInMutation = useMutation({
    mutationFn: (token: string) => 
      apiRequest<AuthResponse>("/api/auth/google", "POST", { token }),
    onSuccess: (data) => {
      if (data.success && data.token && data.user) {
        login(data.token, data.user);
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn trở lại!",
        });
        setLocation("/");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: data.message,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast({
        title: "Đăng nhập thất bại",
        description: error.response?.data?.message || "Đã có lỗi xảy ra",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    // Check if Google Identity Services is loaded
    if (typeof window.google === 'undefined') {
      toast({
        title: "Lỗi",
        description: "Google Sign-In chưa được tải. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check if client ID is configured
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast({
        title: "Tính năng đang phát triển",
        description: "Đăng nhập Google sẽ có sẵn sớm. Vui lòng sử dụng đăng nhập thường.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          console.log('Google response:', response);
          if (response.credential) {
            googleSignInMutation.mutate(response.credential);
          } else {
            toast({
              title: "Đăng nhập thất bại",
              description: "Không thể lấy thông tin từ Google",
              variant: "destructive",
            });
            setIsLoading(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Prompt the user to sign in
      window.google.accounts.id.prompt((notification: any) => {
        console.log('Google prompt notification:', notification);
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Show the button as fallback
          const buttonContainer = document.getElementById('google-signin-button');
          if (buttonContainer) {
            buttonContainer.innerHTML = '';
            buttonContainer.className = 'w-full mt-2';
            window.google.accounts.id.renderButton(
              buttonContainer,
              {
                theme: 'outline',
                size: 'large',
                width: '100%',
                text: 'signin_with',
                locale: 'vi',
              }
            );
          }
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
      toast({
        title: "Lỗi khởi tạo",
        description: "Không thể khởi tạo Google Sign-In",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
            Đang đăng nhập...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Đăng nhập bằng Google
          </>
        )}
      </Button>
      
      {/* Fallback div for Google Sign-In button */}
      <div id="google-signin-button" className="w-full"></div>
    </div>
  );
}

// Add type declaration for Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (element: HTMLElement | null, config: any) => void;
        };
      };
    };
  }
}