import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import { DataTable } from "./Partials/DataTable";
import { columns } from "./Partials/TableColumns";
import AddDialog from "@/Components/common/AddDialog";
import AddUserForm from "./Partials/AddUserForm";

const Users = ({ users, group1, group2, group3 }) => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Manage Users</h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage users.
                        </p>
                    </div>

                    <AddDialog title="User">
                        <AddUserForm groups={{ group1, group2, group3 }} />
                    </AddDialog>
                </div>
                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <DataTable columns={columns} data={users}></DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

Users.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Users;
