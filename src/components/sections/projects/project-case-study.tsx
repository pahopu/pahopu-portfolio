import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Layers,
  LayoutDashboard,
  Lightbulb,
  ShoppingCart,
  Target,
  Users,
  Zap,
} from "lucide-react";

/* --- INTERFACES --- */
interface CaseStudyModule {
  id: string;
  name: string;
  icon: string;
  star: {
    situation: string;
    task: string;
    action: string[];
    result: string;
  };
}

interface CaseStudyProps {
  data: {
    overview: {
      challenge: string;
      solution: string;
      impact: string;
    };
    modules: CaseStudyModule[];
  };
}

// Helper to get dynamic icon based on name
const getIcon = (name: string) => {
  switch (name) {
    case "LayoutDashboard":
      return <LayoutDashboard className="h-5 w-5" />;
    case "ShoppingCart":
      return <ShoppingCart className="h-5 w-5" />;
    case "Users":
      return <Users className="h-5 w-5" />;
    default:
      return <Box className="h-5 w-5" />;
  }
};

export const ProjectCaseStudy = ({ data }: CaseStudyProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="overview" className="w-full flex flex-col h-full">
        {/* --- TABS NAVIGATION (STICKY) --- */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 pt-2 pb-4 border-b">
          <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-4 p-1 gap-1">
            <TabsTrigger value="overview" className="py-2">
              Overview
            </TabsTrigger>
            {data.modules?.map((mod) => (
              <TabsTrigger key={mod.id} value={mod.id} className="py-2">
                {mod.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto pt-4">
          {/* --- TAB 1: OVERVIEW --- */}
          <TabsContent value="overview" className="space-y-6 m-0">
            {/* 1. Challenge */}
            <div className="p-4 rounded-lg border bg-muted/50">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-primary">
                <Target className="h-4 w-4" /> The Challenge
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.overview.challenge}
              </p>
            </div>

            {/* 2. Solution & Impact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" /> Technical
                  Solution
                </h4>
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: data.overview.solution }}
                />
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" /> Key Impact
                </h4>
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: data.overview.impact }}
                />
              </div>
            </div>

            {/* 3. Architecture Diagram */}
            <div className="w-full h-40 bg-muted/30 rounded-xl border border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px]" />

              <div className="flex items-center gap-2 sm:gap-6 z-10 px-4">
                <div className="flex flex-col gap-2">
                  <Badge
                    variant="outline"
                    className="bg-background py-1 justify-center"
                  >
                    Admin
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-background py-1 justify-center"
                  >
                    POS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-background py-1 justify-center"
                  >
                    CRM
                  </Badge>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-px w-8 bg-primary/40" />
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="h-px w-8 bg-primary/40" />
                </div>

                <div className="p-3 bg-background border rounded-lg shadow-sm text-center">
                  <span className="text-xs font-bold text-primary block">
                    Shared Core
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Components & Logic
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* --- DYNAMIC MODULE TABS --- */}
          {data.modules?.map((mod) => (
            <TabsContent
              key={mod.id}
              value={mod.id}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 m-0"
            >
              {/* Header */}
              <div className="flex items-center gap-2 text-primary font-semibold text-lg border-b pb-2">
                {getIcon(mod.icon)} {mod.name}
              </div>

              {/* 1. Situation & Task */}
              <div className="bg-secondary/20 p-4 rounded-lg border border-secondary">
                <h5 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Layers className="h-4 w-4" /> Context:
                </h5>
                <p className="text-sm text-muted-foreground italic">
                  &quot;{mod.star.situation} {mod.star.task}&quot;
                </p>
              </div>

              {/* 2. Actions */}
              <div>
                <h5 className="text-sm font-semibold mb-3">
                  Key Implementations:
                </h5>
                <ul className="space-y-3">
                  {mod.star.action.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-card p-3 rounded-lg border text-sm text-muted-foreground shadow-sm"
                    >
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-foreground">$1</strong>'
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Result */}
              <div className="flex items-start gap-3 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">
                    Outcome:
                  </h5>
                  <p
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: mod.star.result.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong>$1</strong>"
                      ),
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
