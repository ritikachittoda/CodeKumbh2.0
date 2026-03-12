import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Index from "./pages/Index";
import PeriodTracker from "./pages/PeriodTracker";
import NotFound from "./pages/NotFound";
import MentalHealth from "./pages/MentalHealth";
import Nutrition from "./pages/Nutrition";
import Exercise from "./pages/Exercise";
import DoctorFinder from "./pages/DoctorFinder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/period" element={<PeriodTracker />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/doctor-finder" element={<DoctorFinder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
