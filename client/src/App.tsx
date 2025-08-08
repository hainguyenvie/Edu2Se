import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import Home from "@/pages/home";
import TutorDetail from "@/pages/tutor-detail";
import MyProfile from "@/pages/my-profile";
import TutorView from "@/pages/tutor-view";
import Favorites from "@/pages/favorites";
import Dashboard from "@/pages/dashboard";
import Messages from "@/pages/messages";
import VirtualClassroom from "@/pages/virtual-classroom";
import StudyWithMe from "@/pages/study-with-me";
import RankingPage from "@/pages/ranking";
import StudentProfilePage from "@/pages/profile-student";
import TutorProfilePage from "@/pages/profile-tutor";
import CouponsPage from "@/pages/coupons";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/tutor/:id" component={TutorView} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/messages" component={Messages} />
      <Route path="/virtual-classroom" component={() => <VirtualClassroom classInfo={{
        name: "Demo Class",
        subject: "Toán",
        tutor: "Demo Tutor", 
        time: "19:00",
        duration: "60 phút"
      }} />} />
      <Route path="/study-with-me" component={StudyWithMe} />
      <Route path="/ranking" component={RankingPage} />
      <Route path="/profile/student/:slug" component={StudentProfilePage} />
      <Route path="/profile/tutor/:slug" component={TutorProfilePage} />
      <Route path="/coupons" component={CouponsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
