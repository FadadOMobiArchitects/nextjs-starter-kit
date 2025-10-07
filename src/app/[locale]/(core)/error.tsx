"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Readonly<ErrorProps>) {
  const handleRetry = () => {
    try {
      reset();
      toast.success("Rechargement en cours...");
    } catch (retryError) {
      console.error("Retry failed:", retryError);
      toast.error("Erreur lors du rechargement");
    }
  };

  return (
    <div className="grid place-items-center p-6 w-full h-screen">
      <div className="max-w-lg w-full bg-background rounded-lg border p-8 text-center">
        <div className="mx-auto size-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle
            strokeWidth={1.5}
            className="size-7.5 pb-1 text-red-600"
          />
        </div>

        <h2 className="text-xl font-medium mb-2">
          Une erreur inattendue s'est produite
        </h2>

        <p className="text-muted-foreground mb-6 text-sm text-balance leading-normal">
          Une erreur technique est survenue. Actualisez la page ou contactez le
          support si le problème persiste.
        </p>

        {/* Error Details (for development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-3 bg-neutral-100 rounded-md text-left">
            <p className="text-xs text-muted-foreground mb-1">
              Détails de l'erreur :{" "}
              <span className="text-xs font-mono text-primary break-all">
                {error.message}
              </span>
            </p>

            {error.digest && <p className="text-xs mt-1">ID: {error.digest}</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleRetry}
            className="inline-flex items-center gap-2"
            startIcon={<RefreshCw />}
          >
            Réessayer
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Si le problème persiste, veuillez contacter le support technique.
        </p>
      </div>
    </div>
  );
}
