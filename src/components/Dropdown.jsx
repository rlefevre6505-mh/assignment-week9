 "use client"
 import { DropdownMenu } from "radix-ui";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link"
import styles from "./Dropdown.module.css";

export default function Dropdown({props}) {
 
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.button} aria-label="delete gig">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal className={styles.dropdown}>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={0}>
          <DropdownMenu.Item className="DropdownMenuItem" disabled>
<Link className={styles.link} href={`/profile/:username/edit-gig/${props}`} >
            Edit This Gig <div className="RightSlot"></div>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
                    <DropdownMenu.Item className="DropdownMenuItem" disabled>
<Link className={styles.link} href={`/profile/:username/delete-gig/${props}`} >
            Delete This Gig <div className="RightSlot"></div>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
