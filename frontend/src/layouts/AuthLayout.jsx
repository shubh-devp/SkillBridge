import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const containerVariants = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Skill<span className="text-primary">Bridge</span>
              </span>
            </Link>

            <div className="bg-surface rounded-xl border border-border/60 p-6 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
