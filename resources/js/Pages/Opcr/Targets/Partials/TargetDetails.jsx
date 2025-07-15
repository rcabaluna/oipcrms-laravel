import MainLayout from "@/Layouts/MainLayout";
import React from "react";

import TargetDetailsTable from "./TargetDetailsTable";

const TargetDetails = ({ targetdetails }) => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            OPCR Target for XXXX
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage OPCR targets for XXXX.
                        </p>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <div className="table-container">
                        <TargetDetailsTable targetdetails={targetdetails} />
                    </div>
                </div>
            </div>
        </>
    );
};

TargetDetails.layout = (page) => <MainLayout>{page}</MainLayout>;

export default TargetDetails;
