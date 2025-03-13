import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import IndicatorsTable from "./Partials/IndicatorsTable";

const Indicators = ({ indicators }) => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage OPCR Indicators
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage OPCR indicators.
                        </p>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <IndicatorsTable indicators={indicators} />
                    </div>
                </div>
            </div>
        </>
    );
};

Indicators.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Indicators;
