import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiFillGift } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { MdOutlineLaptopWindows } from 'react-icons/md';
import { BiCategoryAlt } from 'react-icons/bi';

export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'ecommerce',
                icon: <FiShoppingBag />,
            },
        ],
    },

    {
        title: 'Pages',
        links: [
            {
                name: 'orders',
                icon: <AiOutlineShoppingCart />,
            },
            {
                name: 'employees',
                icon: <IoMdContacts />,
            },
            {
                name: 'customers',
                icon: <RiContactsLine />,
            },
            {
                name: 'products',
                icon: <AiFillGift />,
            },
            {
                name: 'categories',
                icon: <BiCategoryAlt />,
            },
            {
                name: 'banner',
                icon: <MdOutlineLaptopWindows />,
            },
        ],
    },
    // {
    //     title: 'Apps',
    //     links: [
    //         {
    //             name: 'calendar',
    //             icon: <AiOutlineCalendar />,
    //         },
    //         {
    //             name: 'kanban',
    //             icon: <BsKanban />,
    //         },
    //         {
    //             name: 'editor',
    //             icon: <FiEdit />,
    //         },
    //         {
    //             name: 'color-picker',
    //             icon: <BiColorFill />,
    //         },
    //     ],
    // },
];
