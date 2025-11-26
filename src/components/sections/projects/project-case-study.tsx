import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Cpu,
  Database,
  Gamepad2,
  Layers,
  LayoutDashboard,
  Lightbulb,
  RefreshCw,
  Search,
  ShoppingCart,
  Target,
  Users,
  Zap,
} from "lucide-react";

/* --- INTERFACES --- */

interface ArchitectureDiagram {
  type: "hub-spoke" | "pipeline" | "layers";
  title: string;
  nodes: {
    label: string;
    sub?: string;
  }[];
}

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
    diagram?: ArchitectureDiagram;
    modules: CaseStudyModule[];
  };
}

/* --- HELPERS --- */

// Helper: Format text to render bold markdown (**text**)
const formatText = (text: string) => {
  if (!text) return "";
  return text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="text-foreground font-semibold">$1</strong>'
  );
};

// Helper: Get dynamic icon based on string name
const getIcon = (name: string) => {
  switch (name) {
    case "LayoutDashboard":
      return <LayoutDashboard className="h-5 w-5" />;
    case "ShoppingCart":
      return <ShoppingCart className="h-5 w-5" />;
    case "Users":
      return <Users className="h-5 w-5" />;
    case "Box":
      return <Box className="h-5 w-5" />;
    default:
      return <Box className="h-5 w-5" />;
  }
};

/* --- COMPONENT: DIAGRAM RENDERER --- */

const DiagramRenderer = ({ data }: { data: ArchitectureDiagram }) => {
  /* --- STYLE 1: HUB & SPOKE (ERP) --- */
  if (data.type === "hub-spoke") {
    return (
      <div className="w-full h-48 bg-muted/30 rounded-xl border border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px]" />

        <div className="flex items-center gap-2 sm:gap-6 z-10 px-4">
          {/* Left/Top Nodes */}
          <div className="flex flex-col gap-2">
            {data.nodes.slice(0, 3).map((node, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-background py-1 justify-center min-w-[70px]"
              >
                {node.label}
              </Badge>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="flex flex-col items-center">
            <div className="h-px w-4 sm:w-8 bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-4 sm:w-8 bg-primary/40" />
          </div>

          {/* Center Core */}
          <div className="p-3 bg-background border rounded-lg shadow-sm text-center min-w-[100px]">
            <span className="text-xs font-bold text-primary block">
              {data.title}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Core Logic
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* --- STYLE 2: PIPELINE (AI / IMAGE LENS) --- */
  if (data.type === "pipeline") {
    return (
      <div className="w-full py-6 bg-muted/30 rounded-xl border border-dashed border-primary/20 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#3b82f6_1px,transparent_1px)] bg-size-[12px_12px]" />

        <div className="z-10 flex flex-col sm:flex-row items-center gap-2 overflow-x-auto max-w-full px-4">
          {data.nodes.map((node, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              {/* Node Card */}
              <div className="flex flex-col items-center gap-1 bg-background border p-3 rounded-lg shadow-xs min-w-[100px]">
                <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                  {i === 0 ? (
                    <Search size={16} />
                  ) : i === 1 ? (
                    <Cpu size={16} />
                  ) : i === 2 ? (
                    <Database size={16} />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                </div>
                <span className="text-xs font-bold">{node.label}</span>
                <span className="text-[10px] text-muted-foreground">
                  {node.sub}
                </span>
              </div>

              {/* Arrow Connector */}
              {i < data.nodes.length - 1 && (
                <ArrowRight
                  className="text-muted-foreground/40 rotate-90 sm:rotate-0"
                  size={20}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-4 font-mono uppercase tracking-widest">
          {data.title}
        </p>
      </div>
    );
  }

  /* --- STYLE 3: LAYERS (GAME ENGINE / MARIO) --- */
  if (data.type === "layers") {
    return (
      <div className="w-full py-6 bg-muted/30 rounded-xl border border-dashed border-primary/20 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Stripes */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-size-[100%_20px]" />

        <div className="z-10 flex flex-col gap-1 w-full max-w-[280px]">
          {data.nodes.map((node, i) => (
            <div
              key={i}
              className="w-full bg-background border border-b-4 border-b-muted border-x-border p-2 rounded-md text-center shadow-xs flex items-center justify-center gap-2 relative top-0 hover:-top-1 transition-all"
            >
              {i === 0 && <Gamepad2 className="w-4 h-4 text-orange-500" />}
              {i === 1 && <RefreshCw className="w-4 h-4 text-blue-500" />}
              {i === 2 && <Cpu className="w-4 h-4 text-green-500" />}
              <div>
                <div className="text-xs font-bold">{node.label}</div>
                <div className="text-[10px] text-muted-foreground">
                  {node.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-4 font-mono uppercase tracking-widest">
          {data.title}
        </p>
      </div>
    );
  }

  return null;
};

/* --- COMPONENT: MAIN CASE STUDY --- */

export const ProjectCaseStudy = ({ data }: CaseStudyProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="overview" className="w-full flex flex-col h-full">
        {/* --- SECTION: TABS NAVIGATION --- */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 mt-4 pb-4 border-b">
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

        {/* --- SECTION: SCROLLABLE CONTENT --- */}
        <div className="flex-1 overflow-y-auto pt-4 pb-4 md:pb-6">
          {/* --- TAB CONTENT: OVERVIEW --- */}
          <TabsContent value="overview" className="space-y-6 m-0">
            {/* 1. Challenge Block */}
            <div className="p-4 rounded-lg border bg-muted/50">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-primary">
                <Target className="h-4 w-4" /> The Challenge
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.overview.challenge}
              </p>
            </div>

            {/* 2. Solution & Impact Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" /> Technical
                  Solution
                </h4>
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: formatText(data.overview.solution),
                  }}
                />
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" /> Key Impact
                </h4>
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: formatText(data.overview.impact),
                  }}
                />
              </div>
            </div>

            {/* 3. Architecture Diagram (Conditional Render) */}
            {data.diagram && <DiagramRenderer data={data.diagram} />}
          </TabsContent>

          {/* --- TAB CONTENT: DYNAMIC MODULES --- */}
          {data.modules?.map((mod) => (
            <TabsContent
              key={mod.id}
              value={mod.id}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 m-0"
            >
              {/* Module Header */}
              <div className="flex items-center gap-2 text-primary font-semibold text-lg border-b pb-2">
                {getIcon(mod.icon)} {mod.name}
              </div>

              {/* Context / Situation */}
              <div className="bg-secondary/20 p-4 rounded-lg border border-secondary">
                <h5 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Layers className="h-4 w-4" /> Context:
                </h5>
                <p className="text-sm text-muted-foreground italic">
                  &quot;{mod.star.situation} {mod.star.task}&quot;
                </p>
              </div>

              {/* Key Implementations / Actions */}
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
                          __html: formatText(item),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome / Result */}
              <div className="flex items-start gap-3 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">
                    Outcome:
                  </h5>
                  <p
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: formatText(mod.star.result),
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
