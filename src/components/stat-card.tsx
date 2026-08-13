import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
    label: string;
    value: number;
    icon: LucideIcon;
};

export function StatCard({
                             label,
                             value,
                             icon: Icon,
                         }: StatCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                </div>

                <div>
                    <p className="text-2xl font-semibold">
                        {value}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {label}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}