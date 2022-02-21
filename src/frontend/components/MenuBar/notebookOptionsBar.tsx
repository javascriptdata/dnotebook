import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import FileMenu from "../IconMenu/file";
import EditMenu from "../IconMenu/edit";
import ViewMenu from "../IconMenu/view";
import RunMenu from "../IconMenu/run";
import ServerMenu from "../IconMenu/server";
import SettingsModal from "../Modals/Settings";
import { useSelector } from "react-redux";
import { AppState } from "../../lib/typings/types";
import SaveStatusLabel from "./saveStatusLabel";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";

const MenuBar = () => {
  // Needs enhancement
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });
  const popupState1 = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  const popupState2 = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });
  const popupState3 = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });
  const popupState4 = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });
  const { notebookSavingStatus, activeNotebookName } = useSelector(
    (state: { app: AppState }) => state.app
  );

  return (
    <div
      style={{
        zIndex: 99,
      }}
      className="border-b-2 mt-20 grid grid-cols-2"
    >
      <div className="flex">
        <div>
          <Button
            id="file-menu"
            {...bindHover(popupState)}
          >
            <span className="normal-case">File</span>
          </Button>
          <HoverMenu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <FileMenu />
          </HoverMenu>
        </div>
        <div>
          <Button
            id="edit-menu"
            {...bindHover(popupState1)}
          >
            <span className="normal-case">Edit</span>
          </Button>
          <HoverMenu
            {...bindMenu(popupState1)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <EditMenu />
          </HoverMenu>
        </div>

        <div>
          <Button
            id="view-menu"
            {...bindHover(popupState2)}
          >
            <span className="normal-case">View</span>
          </Button>
          <HoverMenu
            {...bindMenu(popupState2)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <ViewMenu />
          </HoverMenu>
        </div>

        <div>
          <Button
            id="run-menu"
            {...bindHover(popupState3)}
          >
            <span className="normal-case">Run</span>
          </Button>
          <HoverMenu
            {...bindMenu(popupState3)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <RunMenu />
          </HoverMenu>
        </div>

        <div>
          <Button
            id="server-menu"
            {...bindHover(popupState4)}
          >
            <span className="normal-case">Server</span>
          </Button>
          <HoverMenu
            {...bindMenu(popupState4)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <ServerMenu />
          </HoverMenu>
        </div>

        <div>
          <Button>
            <span className="normal-case">
              {" "}
              <SettingsModal />
            </span>
          </Button>
        </div>
      </div>
      <div className="justify-self-end mr-5">
        {activeNotebookName !== "Dashboard" ? (
          <SaveStatusLabel notebookStatus={notebookSavingStatus} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
