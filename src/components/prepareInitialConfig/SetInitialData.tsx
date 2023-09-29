import {ApplicationConfigContext} from "./ApplicationConfigContext";
import {ChatLogBoxContainer} from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import {TopNavbar} from "../topNavbar/TopNavbar";

export function SetInitialData({applicationConfig}: Record<string, string>) {
    // TODO: use "electron-store" and "Ajv JSON schema validator" instead of custom solution, if something is not right display info about broken config file
    // TODO: add option to restore/add default config in case of broken file
    return (
        <ApplicationConfigContext.Provider value={applicationConfig}>
            <div className="flex flex-col">
                <TopNavbar />
                <div className="flex flex-row">
                    <SideMenu />
                    <ChatLogBoxContainer/>
                </div>
            </div>
        </ApplicationConfigContext.Provider>
    )
}