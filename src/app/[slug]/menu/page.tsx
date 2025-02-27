import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{consumptionMethod: string}>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;
    if (!isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    };
    
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
            <div className="relative h-[250px] w-full">
                <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 left-4 z-50 rounded-full">
                        <ChevronLeftIcon/>
                </Button>
                <Image src={restaurant?.coverImageUrl} alt={restaurant.name} fill className="object-cover" />
                <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 right-4 z-50 rounded-full">
                        <ScrollTextIcon/>
                </Button>
            </div>
        </div>
    );
};
 
export default RestaurantMenuPage;

// http://localhost:3000/Mec-App/menu?consumptionMethod=dine_in

