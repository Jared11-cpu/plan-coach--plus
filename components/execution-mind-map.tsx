"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GitFork, Map as MapIcon, Sparkles } from "lucide-react";
import { MapNodeDetailPanel } from "@/components/map-node-detail-panel";
import { MindMapEdge } from "@/components/mind-map-edge";
import { MindMapNode } from "@/components/mind-map-node";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/use-plan-store";
import type { ExecutionMapMode } from "@/types";

const modeOptions: Array<{ label: string; value: ExecutionMapMode }> = [
  { label: "Tasks", value: "tasks" },
  { label: "Proofs", value: "proofs" },
  { label: "Demo", value: "demo" }
];

export function ExecutionMindMap() {
  const {
    executionMap,
    selectedMapNodeId,
    mapMode,
    tasks,
    proofs,
    selectMapNode,
    setMapMode,
    completeTask,
    breakTask
  } = usePlanStore();

  const nodeMap = useMemo(() => new Map(executionMap.nodes.map((node) => [node.id, node])), [executionMap.nodes]);
  const selectedNode = selectedMapNodeId ? nodeMap.get(selectedMapNodeId) : executionMap.nodes[0];
  const selectedTask = selectedNode?.taskId ? tasks.find((task) => task.id === selectedNode.taskId) : undefined;
  const selectedProof = selectedNode?.proofId ? proofs.find((proof) => proof.id === selectedNode.proofId) : undefined;

  return (
    <section id="execution-map" data-testid="execution-map" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#ded7cc] bg-[#fbf7ef]/80 px-5 py-3 text-base font-black text-[#6f675e] shadow-sm backdrop-blur">
              <MapIcon className="h-5 w-5 text-[#0f9f8c]" />
              AI Execution Map
            </p>
            <h2 className="max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-[#211f1c] sm:text-7xl">
              把感性的目标，拆成一张会生长的任务脑图。
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 rounded-full border border-[#ded7cc] bg-[#fbf7ef]/78 p-2 shadow-[0_18px_50px_rgba(43,38,30,0.07)]">
            {modeOptions.map((option) => (
              <Button
                key={option.value}
                size="lg"
                variant={mapMode === option.value ? "default" : "ghost"}
                className="rounded-full text-base"
                onClick={() => setMapMode(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-7 xl:grid-cols-[1.35fr_0.65fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative min-h-[720px] overflow-hidden rounded-[3rem] border border-[#e7ded1] bg-[#fbf7ef]/84 shadow-[0_35px_120px_rgba(43,38,30,0.10)]"
          >
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(33,31,28,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(33,31,28,0.055)_1px,transparent_1px)] [background-size:44px_44px]" />
            <div className="absolute left-7 top-7 z-20 flex items-center gap-3 rounded-full bg-[#211f1c]/90 px-5 py-3 text-base font-black text-[#f8f3ea] backdrop-blur">
              <GitFork className="h-5 w-5 text-[#f6ca42]" />
              {executionMap.nodes.length} nodes / {executionMap.edges.length} links
            </div>
            <svg className="absolute inset-0 h-full w-full">
              {executionMap.edges.map((edge) => (
                <MindMapEdge key={edge.id} edge={edge} source={nodeMap.get(edge.source)} target={nodeMap.get(edge.target)} />
              ))}
            </svg>
            {executionMap.nodes.map((node) => (
              <MindMapNode
                key={node.id}
                node={node}
                selected={selectedNode?.id === node.id}
                onSelect={selectMapNode}
              />
            ))}
            <div className="absolute bottom-7 left-7 right-7 z-20 rounded-[2rem] border border-[#e7ded1] bg-white/72 p-5 text-lg font-black leading-8 text-[#4c463f] backdrop-blur">
              <Sparkles className="mr-2 inline h-5 w-5 text-[#a08753]" />
              演示重点：点击任务节点查看 AI 拆解，点击“拆小一点”长出 mini tasks，完成任务后长出 Proof 节点。
            </div>
          </motion.div>

          <MapNodeDetailPanel
            node={selectedNode}
            task={selectedTask}
            proof={selectedProof}
            onComplete={completeTask}
            onBreakDown={(id) => void breakTask(id)}
          />
        </div>
      </div>
    </section>
  );
}
