import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stats } from "@/components/dashboard/stats";
import { Charts } from "@/components/dashboard/charts";
import { WorkOrders } from "@/components/dashboard/work-orders";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Stats />
      <Charts />
      <WorkOrders />
    </motion.div>
  );
}
