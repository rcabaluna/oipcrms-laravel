import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import Template from "./Template";

const TargetsPage = () => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage OPCR Targets
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage OPCR targets.
                        </p>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <div className="table-container">
                        <Template />
                    </div>
                </div>
            </div>
        </>
    );
};

TargetsPage.layout = (page) => <MainLayout>{page}</MainLayout>;

export default TargetsPage;
