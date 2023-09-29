interface SideMenuItemProps {
    item: string;
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({item}) => {
    return (
        <li>
            <a>
                {item}
            </a>
        </li>
    );
}