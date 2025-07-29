// The main entry point for our app.
// In Next.js 14 with the App Router, this file is `app/page.tsx`.

"use client";

import React, { useState, useMemo, useEffect, Dispatch, SetStateAction } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Moon,
  Package2,
  Search,
  Sun,
  Users,
  Calendar as CalendarIcon,
  FileDown,
  type LucideProps,
} from "lucide-react";
import { format, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Transaction {
  name: string;
  email: string;
  amount: string;
  type: string;
  date: Date;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string | number;
}

interface DashboardProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  date: Date[] | undefined;
  setDate: Dispatch<SetStateAction<Date[] | undefined>>;
  sortConfig: SortConfig;
  requestSort: (key: keyof Transaction) => void;
  getSortIndicator: (key: keyof Transaction) => string;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  handleExportCSV: () => void;
}

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p>{label}</p>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const trafficSourceData = [
  { name: "Google", value: 400 },
  { name: "Facebook", value: 300 },
  { name: "Twitter", value: 300 },
  { name: "LinkedIn", value: 200 },
];

// Use this structure to continue building your dashboard UI
// Ensure that each function and parameter has proper typing to avoid ESLint build errors
