export interface HomeProps {
  data: [
    {
      created_at: string;
      first_name: string;
      id: number;
      last_name: string;
      phones: [
        {
          number: string;
        }
      ];
    }
  ];
};

export interface Contacts {
  id: number;
  first_name: string;
  last_name: string;
  phones: [
    {
      number: string;
    }
  ];
};

export interface FavoriteContact {
  id: number;
  first_name: string;
  last_name: string;
  phones: [
    {
      number: string;
    }
  ];
};

export interface FormModalProps {
  setIsShowModal: (value: boolean) => void;
  updateContactsList: (value: any) => void;
  updateEditedContact: (value: any) => void;
  setIsEdit: (value: boolean) => void;
  isEdit: boolean;
  selectedContact: any;
};

export interface ListContactProps {
  id?: number;
  name?: string;
  phone: Array<string>;
  onFavoriteToggle?: () => void;
  onUnfavoriteToggle?: () => void;
  onRemoveContact?: () => void;
  isFavorite?: boolean;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  onClick?: () => void;
};


export interface PaginationItemProps {
  page?: number;
  className?: string;
  onClick?: any;
};

export interface ButtonProps {
  isExplore?: boolean;
  text: string;
  handleButton?: () => void;
};

export interface LayoutProps {
  children: React.ReactNode;
};

export interface NavbarProps {
  children: React.ReactNode;
};

export interface Paginationrops {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export interface ContainerProps {
  isLandingPage?: boolean;
  children?: React.ReactNode;
  id?: string;
};