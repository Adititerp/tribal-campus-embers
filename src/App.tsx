
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import AncientMap from "./pages/AncientMap";
import FeedingZones from "./pages/FeedingZones";
import TrainingGrounds from "./pages/TrainingGrounds";
import Leaderboard from "./pages/Leaderboard";
import Protected from "./pages/Protected";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import useGameStore from "./store/gameStore";

const queryClient = new QueryClient();

const App = () => {
  const { loadUser } = useGameStore();
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="bottom-right" theme="light" closeButton />
        <Routes>
          <Route path="/" element={<Registration />} />
          
          <Route 
            path="/map" 
            element={
              <Protected>
                <AncientMap />
              </Protected>
            } 
          />
          
          <Route 
            path="/feeding-zones" 
            element={
              <Protected>
                <FeedingZones />
              </Protected>
            } 
          />
          
          <Route 
            path="/training-grounds" 
            element={
              <Protected>
                <TrainingGrounds />
              </Protected>
            } 
          />
          
          <Route 
            path="/leaderboard" 
            element={
              <Protected>
                <Leaderboard />
              </Protected>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
