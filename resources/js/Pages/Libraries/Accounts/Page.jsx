import MainLayout from "@/Layouts/MainLayout";
import React, { useEffect } from "react";
import { DataTable } from "./Partials/DataTable";
import { columns } from "./Partials/TableColumns";
import AddAccountForm from "./Partials/AddAccountForm";
import AddDialog from "@/Components/common/AddDialog";

const Accounts = ({ accounts }) => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage User Accounts
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage user accounts.
                        </p>
                    </div>

                    <AddDialog title="User Account">
                        <AddAccountForm />
                    </AddDialog>
                </div>
                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <DataTable
                            columns={columns}
                            data={accounts}
                        ></DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

Accounts.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Accounts;
