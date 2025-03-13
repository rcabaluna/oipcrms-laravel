import MainLayout from "@/Layouts/MainLayout";
import React from "react";

const AccomplishmentsPage = () => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage OPCR Accomplishments
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage OPCR accomplishments.
                        </p>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <div className="table-container">
                        {/* <DataTable columns={columns} data={users}></DataTable> */}
                    </div>
                </div>
            </div>
        </>
    );
};

AccomplishmentsPage.layout = (page) => <MainLayout>{page}</MainLayout>;

export default AccomplishmentsPage;
