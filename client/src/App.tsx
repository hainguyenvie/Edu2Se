import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import Home from "@/pages/home";
import TutorDashboard from "@/pages/tutor-dashboard";
import TutorDetail from "@/pages/tutor-detail";
import TutorView from "@/pages/tutor-view";
import Favorites from "@/pages/favorites";

import Messages from "@/pages/messages";
import VirtualClassroom from "@/pages/virtual-classroom";
import StudyWithMe from "@/pages/study-with-me";
import RankingPage from "@/pages/ranking";
import PublicProfilePage from "@/pages/public-profile";
import CouponsPage from "@/pages/coupons";
import QAForum from "@/pages/qa-forum";
import CreateStudyRoom from "@/pages/create-study-room";
import QuickRequests from "@/pages/quick-requests";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import NotFound from "@/pages/not-found";
import SettingsPage from "@/pages/settings";
import UnifiedMyBioPage from "@/pages/my-biography-unified";
import RoleDemo from "@/pages/role-demo";
import TutorSuccessPage from "@/pages/tutor-success";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/tutor/:id" component={TutorView} />
      <Route path="/my-profile" component={TutorDashboard} />
      <Route path="/profile/edit" component={TutorDetail} />
      <Route path="/favorites" component={Favorites} />

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
      <Route path="/profile/:role/:slug" component={PublicProfilePage} />
      <Route path="/coupons" component={CouponsPage} />
      <Route path="/qa-forum" component={QAForum} />
      <Route path="/create-study-room" component={CreateStudyRoom} />
      <Route path="/quick-requests" component={QuickRequests} />
      <Route path="/my-biography" component={UnifiedMyBioPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/role-demo" component={RoleDemo} />
      <Route path="/tutor-success" component={TutorSuccessPage} />
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
