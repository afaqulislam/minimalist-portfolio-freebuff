import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background text-foreground"
    >
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Error
          </p>
          <h1 className="font-display text-6xl font-semibold tracking-tight sm:text-7xl">
            404
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Page Not Found
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground/80">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block rounded-none bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Back to portfolio
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
