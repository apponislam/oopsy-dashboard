"use client";

import React, { useState } from "react";
import { ServiceCategory } from "./types";
import { CategoriesHeader } from "./CategoriesHeader";
import { CategoryList } from "./CategoryList";
import { AddCategoryForm } from "./AddCategoryForm";

const initialCategories: ServiceCategory[] = [
    { id: "cat-1", name: "Restroom", icon: "🚽", listingsCount: 482, isActive: true },
    { id: "cat-2", name: "Private Bathroom", icon: "🪥", listingsCount: 148, isActive: true },
    { id: "cat-3", name: "Shower", icon: "🚿", listingsCount: 201, isActive: true },
    { id: "cat-4", name: "Storage Locker", icon: "🔒", listingsCount: 94, isActive: true },
    { id: "cat-5", name: "Jacuzzi", icon: "💧", listingsCount: 38, isActive: true },
    { id: "cat-6", name: "Spa", icon: "🧖", listingsCount: 62, isActive: true },
    { id: "cat-7", name: "Hot Tub", icon: "♨️", listingsCount: 29, isActive: true },
    { id: "cat-8", name: "Bathtub / Bath", icon: "🛁", listingsCount: 41, isActive: true },
    { id: "cat-9", name: "Accessible", icon: "♿", listingsCount: 72, isActive: true },
    { id: "cat-10", name: "Baby Changing", icon: "👶", listingsCount: 55, isActive: true },
];

export function CategoriesManagement() {
    const [categories, setCategories] = useState<ServiceCategory[]>(initialCategories);

    const handleAddCategory = (name: string, icon: string) => {
        const newCategory: ServiceCategory = {
            id: `cat-${Date.now()}`,
            name,
            icon,
            listingsCount: 0,
            isActive: true,
        };
        setCategories((prev) => [...prev, newCategory]);
    };

    const handleToggleCategory = (id: string) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
            )
        );
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            <CategoriesHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <CategoryList
                        categories={categories}
                        onToggleCategory={handleToggleCategory}
                    />
                </div>
                <div className="lg:col-span-1">
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </div>
            </div>
        </div>
    );
}
