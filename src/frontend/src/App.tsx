import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Services } from "./pages/Services";
import { Studio } from "./pages/Studio";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { PortfolioManager } from "./pages/admin/PortfolioManager";
import { ServicesManager } from "./pages/admin/ServicesManager";
import { SubmissionsViewer } from "./pages/admin/SubmissionsViewer";
import { TeamManager } from "./pages/admin/TeamManager";
import { TestimonialsManager } from "./pages/admin/TestimonialsManager";

const queryClient = new QueryClient();

// Root route — no shared chrome
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-cinzel text-8xl font-bold text-gold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link to="/" className="btn-gold">
          Back Home
        </Link>
      </div>
    </div>
  ),
});

// Public layout (Navbar + Footer)
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: About,
});
const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services",
  component: Services,
});
const portfolioRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/portfolio",
  component: Portfolio,
});
const studioRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/studio",
  component: Studio,
});
const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: Contact,
});

// Admin layout route (no Navbar/Footer)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

const adminPortfolioRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/portfolio",
  component: PortfolioManager,
});
const adminTestimonialsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/testimonials",
  component: TestimonialsManager,
});
const adminTeamRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/team",
  component: TeamManager,
});
const adminServicesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/services",
  component: ServicesManager,
});
const adminSubmissionsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/submissions",
  component: SubmissionsViewer,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    indexRoute,
    aboutRoute,
    servicesRoute,
    portfolioRoute,
    studioRoute,
    contactRoute,
  ]),
  adminRoute.addChildren([
    adminPortfolioRoute,
    adminTestimonialsRoute,
    adminTeamRoute,
    adminServicesRoute,
    adminSubmissionsRoute,
  ]),
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
