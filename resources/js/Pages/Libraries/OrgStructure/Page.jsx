import MainLayout from "@/Layouts/MainLayout";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns as OfficeColumns } from "./Groups/Group1/TableColumns";
import { columns as DivisionColumns } from "./Groups/Group2/TableColumns";
import { columns as UnitColumns } from "./Groups/Group3/TableColumns";

import { DataTable } from "./Groups/Partials/DataTable";
import AddDialog from "@/Components/common/AddDialog";
import AddOfficeForm from "./Groups/Group1/AddOfficeForm";
import AddDivisionForm from "./Groups/Group2/AddDivisionForm";
import AddUnitForm from "./Groups/Group3/AddUnitForm";

const OrgStructure = ({ office, division, unit }) => {
    const [activeTab, setActiveTab] = useState("office");

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage Organizational Structure
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage organizational structure.
                        </p>
                    </div>
                    {activeTab === "office" && (
                        <AddDialog title="Office">
                            <AddOfficeForm />
                        </AddDialog>
                    )}
                    {activeTab === "division" && (
                        <AddDialog title="Division">
                            <AddDivisionForm group={{ office }} />
                        </AddDialog>
                    )}
                    {activeTab === "unit" && (
                        <AddDialog title="Unit">
                            <AddUnitForm group={{ office, division }} />
                        </AddDialog>
                    )}
                </div>
                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <Tabs
                            defaultValue="office"
                            onValueChange={(value) => setActiveTab(value)}
                        >
                            <TabsList>
                                <TabsTrigger value="office">Office</TabsTrigger>
                                <TabsTrigger value="division">
                                    Division
                                </TabsTrigger>
                                <TabsTrigger value="unit">Unit</TabsTrigger>
                            </TabsList>
                            <TabsContent value="office">
                                <DataTable
                                    columns={OfficeColumns}
                                    data={office}
                                />
                            </TabsContent>
                            <TabsContent value="division">
                                <DataTable
                                    columns={DivisionColumns}
                                    data={division}
                                />
                            </TabsContent>
                            <TabsContent value="unit">
                                <DataTable columns={UnitColumns} data={unit} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
};

OrgStructure.layout = (page) => <MainLayout>{page}</MainLayout>;

export default OrgStructure;
