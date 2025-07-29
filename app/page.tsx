// The main entry point for our app.
// In Next.js 14 with the App Router, this file is `app/page.tsx`.
// This component brings together all the smaller, reusable components to build the full dashboard UI.

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Activity, ChevronLeft, ChevronRight, CircleUser, CreditCard, DollarSign, Menu, Moon, Package2, Search, Sun, Users, Calendar as CalendarIcon, FileDown } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { DateRange } from "react-day-picker";

// --- SHADCN UI COMPONENT IMPORTS ---
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const initialKeyMetrics = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month", icon: DollarSign },
  { title: "Subscriptions", value: "+2350", change: "+180.1% from last month", icon: Users },
  { title: "Sales", value: "+12,234", change: "+19% from last month", icon: CreditCard },
  { title: "Active Now", value: "+573", change: "+201 since last hour", icon: Activity },
];
const revenueData = [ { name: "Jan", total: 4000 }, { name: "Feb", total: 3000 }, { name: "Mar", total: 2000 }, { name: "Apr", total: 2780 }, { name: "May", total: 1890 }, { name: "Jun", total: 2390 }, { name: "Jul", total: 3490 }, { name: "Aug", total: 2000 }, { name: "Sep", total: 2780 }, { name: "Oct", total: 1890 }, { name: "Nov", total: 2390 }, { name: "Dec", total: 3490 }, ];
const conversionData = [ { name: 'Week 1', conversions: 400 }, { name: 'Week 2', conversions: 300 }, { name: 'Week 3', conversions: 500 }, { name: 'Week 4', conversions: 450 }, { name: 'Week 5', conversions: 600 }, { name: 'Week 6', conversions: 550 }, { name: 'Week 7', conversions: 700 }, ];
const trafficSourceData = [ { name: 'Organic Search', value: 400, fill: '#8884d8' }, { name: 'Direct', value: 300, fill: '#82ca9d' }, { name: 'Referral', value: 300, fill: '#ffc658' }, { name: 'Social Media', value: 200, fill: '#ff8042' }, ];

// --- REFACTORED COMPONENTS ---

const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-background border border-muted rounded-lg shadow-lg">
                <p className="label font-bold text-foreground">{`${label}`}</p>
                <p className="intro text-sm text-muted-foreground">{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const MetricCard = ({ title, value, change, Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

const MetricCardsGrid = ({ metrics }) => (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {metrics.map((metric, index) => (
            <motion.div key={index} variants={cardAnimation} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.1 }}>
                <MetricCard title={metric.title} value={metric.value} change={metric.change} Icon={metric.icon} />
            </motion.div>
        ))}
    </div>
);

const ChartGrid = () => (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <motion.div variants={cardAnimation} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }} className="xl:col-span-2">
            <Card><CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader><CardContent className="pl-2"><ResponsiveContainer width="100%" height={350}><BarChart data={revenueData}><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} /><Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<CustomTooltip />} /><Bar dataKey="total" name="Total Revenue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" /></BarChart></ResponsiveContainer></CardContent></Card>
        </motion.div>
        <motion.div variants={cardAnimation} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.5 }}>
            <Card><CardHeader><CardTitle>Conversions Over Time</CardTitle></CardHeader><CardContent className="pl-2"><ResponsiveContainer width="100%" height={350}><LineChart data={conversionData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><Tooltip content={<CustomTooltip />} /><Legend /><Line type="monotone" dataKey="conversions" name="Conversions" stroke="currentColor" className="stroke-primary" activeDot={{ r: 8 }} /></LineChart></ResponsiveContainer></CardContent></Card>
        </motion.div>
    </div>
);

const TransactionsAndSourcesGrid = ({ transactions, isLoading, error, searchTerm, setSearchTerm, date, setDate, sortConfig, requestSort, getSortIndicator, currentPage, setCurrentPage, totalPages, handleExportCSV }) => {
    const sortedAndPaginatedTransactions = useMemo(() => {
        let sortableItems = [...transactions];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        const startIndex = (currentPage - 1) * 5;
        return sortableItems.slice(startIndex, startIndex + 5);
    }, [transactions, sortConfig, currentPage]);

    return (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            <motion.div variants={cardAnimation} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }} className="lg:col-span-2">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="grid gap-2 flex-grow"><CardTitle>Transactions</CardTitle><CardDescription>Recent transactions from your store.</CardDescription></div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <Input placeholder="Filter by name/email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto" />
                            <Popover><PopoverTrigger asChild><Button id="date" variant={"outline"} className={cn("w-full md:w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date?.from ? (date.to ? (<>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>) : (format(date.from, "LLL dd, y"))) : (<span>Pick a date</span>)}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="end"><Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} /></PopoverContent></Popover>
                            <Button size="sm" variant="outline" className="h-10 gap-1" onClick={handleExportCSV}><FileDown className="h-4 w-4" /> Export</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead onClick={() => requestSort('name')} className="cursor-pointer">Customer{getSortIndicator('name')}</TableHead><TableHead onClick={() => requestSort('type')} className="cursor-pointer hidden sm:table-cell">Type{getSortIndicator('type')}</TableHead><TableHead onClick={() => requestSort('amount')} className="text-right cursor-pointer">Amount{getSortIndicator('amount')}</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {isLoading ? (Array.from({ length: 5 }).map((_, index) => (<TableRow key={index}><TableCell><Skeleton className="h-5 w-32" /></TableCell><TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-24" /></TableCell><TableCell className="text-right"><Skeleton className="h-5 w-16" /></TableCell></TableRow>))) : error ? (<TableRow><TableCell colSpan={3} className="text-center text-red-500">{error}</TableCell></TableRow>) : (sortedAndPaginatedTransactions.map((transaction, index) => (<TableRow key={index}><TableCell><div className="font-medium">{transaction.name}</div><div className="hidden text-sm text-muted-foreground md:inline">{transaction.email}</div></TableCell><TableCell className="hidden sm:table-cell">{transaction.type}</TableCell><TableCell className="text-right">{transaction.amount}</TableCell></TableRow>)))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">Showing <strong>{((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, transactions.length)}</strong> of <strong>{transactions.length}</strong> transactions</div>
                        <div className="ml-auto flex items-center gap-2"><Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1 || isLoading}><ChevronLeft className="h-4 w-4" /> Previous</Button><Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || isLoading}>Next <ChevronRight className="h-4 w-4" /></Button></div>
                    </CardFooter>
                </Card>
            </motion.div>
             <motion.div variants={cardAnimation} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.7 }}>
                <Card>
                    <CardHeader><CardTitle>Traffic Sources</CardTitle><CardDescription>Breakdown of where your users are coming from.</CardDescription></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<CustomTooltip />} />
                                <Pie data={trafficSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label={({ value }) => value}>{trafficSourceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}</Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
    const { setTheme } = useTheme();
    
    const [keyMetrics, setKeyMetrics] = useState(initialKeyMetrics);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    
    const [date, setDate] = useState({ from: subDays(new Date(), 29), to: new Date() });

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Data could not be fetched!');
                const data = await response.json();
                const formattedData = data.map((user, index) => ({ name: user.name, email: user.email, amount: `$${(Math.random() * 500 + 50).toFixed(2)}`, type: Math.random() > 0.5 ? 'Sale' : 'Subscription', date: subDays(new Date(), index * 3) }));
                setTransactions(formattedData);
            } catch (err) { setError(err.message); } finally { setIsLoading(false); }
        };
        fetchTransactions();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setKeyMetrics(prevMetrics => prevMetrics.map(metric => metric.title === "Active Now" ? { ...metric, value: `+${Math.floor(Math.random() * 100) + 500}` } : metric));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(item => (!date?.from || !date?.to) ? true : new Date(item.date) >= date.from && new Date(item.date) <= date.to)
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, transactions, date]);

    const totalPages = Math.ceil(filteredTransactions.length / 5);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        return '';
    };

    const handleExportCSV = () => {
        if (filteredTransactions.length === 0) {
            console.error("No Data to Export: Please select a different date range or clear filters.");
            return;
        }
        const headers = ["Name", "Email", "Amount", "Type", "Date"];
        const csvRows = filteredTransactions.map(t => {
            const formattedDate = format(new Date(t.date), "yyyy-MM-dd");
            const escapeCsvCell = (cell) => `"${String(cell).replace(/"/g, '""')}"`;
            return [escapeCsvCell(t.name), escapeCsvCell(t.email), escapeCsvCell(t.amount), escapeCsvCell(t.type), escapeCsvCell(formattedDate)].join(',');
        });
        const csvString = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Export Successful: Your transactions have been downloaded as a CSV file.");
    };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"><a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base"><Package2 className="h-6 w-6" /> <span className="sr-only">ADmyBRAND</span></a><a href="#" className="text-foreground transition-colors hover:text-foreground">Dashboard</a></nav>
        <Sheet><SheetTrigger asChild><Button variant="outline" size="icon" className="shrink-0 md:hidden"><Menu className="h-5 w-5" /> <span className="sr-only">Toggle navigation menu</span></Button></SheetTrigger><SheetContent side="left"><nav className="grid gap-6 text-lg font-medium"><a href="#" className="flex items-center gap-2 text-lg font-semibold"><Package2 className="h-6 w-6" /> <span className="sr-only">ADmyBRAND</span></a><a href="#" className="hover:text-foreground">Dashboard</a></nav></SheetContent></Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial"><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input type="search" placeholder="Search..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" /></div></form>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /><span className="sr-only">Toggle theme</span></Button>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary" size="icon" className="rounded-full"><CircleUser className="h-5 w-5" /> <span className="sr-only">Toggle user menu</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>My Account</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>Settings</DropdownMenuItem><DropdownMenuItem>Support</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <MetricCardsGrid metrics={keyMetrics} />
        <ChartGrid />
        <TransactionsAndSourcesGrid 
            transactions={filteredTransactions}
            isLoading={isLoading}
            error={error}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            date={date}
            setDate={setDate}
            sortConfig={sortConfig}
            requestSort={requestSort}
            getSortIndicator={getSortIndicator}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            handleExportCSV={handleExportCSV}
        />
      </main>
    </div>
  );
};

export default function AnalyticsPage() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) { return null; }
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Dashboard />
        </ThemeProvider>
    );
}
