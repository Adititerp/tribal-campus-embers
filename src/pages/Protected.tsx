
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "@/store/gameStore";
import Navbar from "@/components/Navbar";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, loadUser } = useGameStore();
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Protected;
