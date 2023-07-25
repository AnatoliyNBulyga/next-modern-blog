"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/components/Avatar";
import {useCallback, useEffect, useRef, useState} from "react";
import { signOut } from "next-auth/react";

import MenuItem from "@/components/navbar/MenuItem";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import {SafeUser} from "@/types";
import useProfileModal from "@/hooks/useProfileModal";

interface UserMenuProps {
    currentUser?: SafeUser | null;
    menuItems?: string[];
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    menuItems
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const profileModal = useProfileModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {

            const path = event.path || (event.composedPath && event.composedPath());

            if ( !path.includes(menuRef.current) ) {
                setIsOpen( false)
            }
        }
        document.body.addEventListener('click', handleOutsideClick)
        return () => document.body.removeEventListener('click', handleOutsideClick);

    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex flex-row items-center gap-3">

                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <Avatar src={currentUser?.image} />
                </div>
            </div>

            {
                isOpen && (
                    <div
                        className="
                            absolute
                            rounded-xl
                            shadow-md
                            w-[40vw]
                            md:w-[140px]
                            bg-white
                            overflow-hidden
                            right-0
                            top-12
                            text-sm
                        "
                    >
                        <div className="flex flex-col cursor-pointer">
                          {
                              menuItems
                              &&
                              <div className="md:hidden">
                                  {
                                      ['all', ...menuItems].map((category: string) => {
                                          return (
                                              <div
                                                  key={category}
                                                  className="capitalize last:border-b-gray-100 last:border-b last:border-b-solid"
                                              >
                                                  <MenuItem
                                                      onClick={() => {
                                                          setIsOpen(false);
                                                          router.push(category == 'all' ? '/' : `/?cat=${category}`)
                                                      }}
                                                      label={category}
                                                  />
                                              </div>
                                          )
                                      })
                                  }
                              </div>
                          }
                          {
                              currentUser
                              ?
                                  <>
                                      <MenuItem
                                          onClick={() => {
                                            setIsOpen(false);
                                            router.push("/write")
                                          }}
                                          label="Whrite"
                                      />
                                      <MenuItem
                                          onClick={profileModal.onOpen}
                                          label="Profile"
                                      />
                                      <MenuItem
                                          onClick={() => signOut()}
                                          label="Logout"
                                      />
                                  </>
                              :
                                  <>
                                      <MenuItem
                                          onClick={loginModal.onOpen}
                                          label="Login"
                                      />
                                      <MenuItem
                                          onClick={registerModal.onOpen}
                                          label="Sign up"
                                      />
                                  </>
                          }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UserMenu;