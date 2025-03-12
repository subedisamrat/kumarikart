import React, { useState } from "react";
import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
    setOpenDialog(false);
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gray-50 shadow-md border-b border-gray-200">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block p-2 rounded-md hover:bg-gray-100 transition"
      >
        <AlignJustify className="w-6 h-6 text-gray-700" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => setOpenDialog(true)}
          className="flex items-center gap-2 text-white bg-slate-600 border border-gray-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
        >
          <LogOut className="w-5 h-5 text-white" />
          <span className="font-medium">Log Out</span>
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-6 rounded-lg shadow-lg bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Confirm Logout
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 text-sm">
            Are you sure you want to log out?
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="px-4 py-2 text-gray-700 border-gray-300 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default AdminHeader;
