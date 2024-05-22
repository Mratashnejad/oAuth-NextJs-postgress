'use client'
import    RootLayout            from '@/app/layout'
import  { useRouter }           from 'next/navigation'
import  { useEffect , useState} from 'react';
import    Link                  from "next/link"

//Firebase Imports////////////////////
import  { useAuth}              from '@/app/context/AuthContext';
import  { storage }             from '@/configs/FireBaseConfig';
import  { ref , uploadBytesResumable , getDownloadURL } from 'firebase/storage';
//Firebase Imports////////////////////


//UI Imports/////////////////////////
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getUserData } from '@/utils/api';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
//UI Imports/////////////////////////


const pathname = '/dashboard'



interface UserData {
  _id:string;
  uid : string;
  phoneNumber:string | null;
  email?:string;
  name?:string;
  family?:string;
  avatar?:string;
  bio?:string;
}




export default function Dashboard() {
  const { user , logOut }              = useAuth()
  const [ currentSection, setCurrentSection] = useState('user');
  const   router                      = useRouter();
  const [ userData,setUserData ]      = useState<UserData | null>(null);
  const [ isEditing,setEditing ]      = useState(false)
  const [ name ,setNmae        ]      = useState(false)
  const [ family  , setFamily  ]      = useState(false)
  const [ email   , setEmail   ]      = useState(false)
  const [ bio     , setBio     ]      = useState(false)
  const [ avatarFile , setAvatarFile ]= useState<File | null>(null);
  const [ uploadProgress , setUploadProgress ] = useState(0);

  const handleFileChange =  (e : React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    if (!avatarFile || !user) return;
    const storageRef = ref(storage, `avatars/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, avatarFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserData((prevData) => prevData ? { ...prevData, avatar: downloadURL } : null);
          saveToMongoDB(downloadURL);
        });
      }
    );
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  
  const handleEditClick = ()=>{
    setEditing (!isEditing)
  }

  const handleSaveClick = ()=>{
    setEditing(false)
  }




const  handleAvatarChange=()=>{
  //handle editing avar


}
const handleDeleteAvatar=()=>{
///handel avatar removing
}

 useEffect(()=>{
  if(user){

    getUserData(user._id)
    .then((data)=>{
      setUserData(data)
    })
    .catch((error)=>{
      console.error('error fetchin user data')
    })

  }else{
    setUserData(null);
  }

 } , [user]);

 
  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <RootLayout pathname={pathname}>
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Jobs
          </Link>
          
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Jobs
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              /> */}
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>{userData?.phoneNumber}</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Notification</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav
                className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
              >
                <Link href="#" className="font-semibold text-primary">
                  User Information
                </Link>
                <Link href="#">Address</Link>
                <Link href="#">Languages</Link>
                <Link href="#">Advanced</Link>
              </nav>
              <div className="grid gap-6">
                {userData? (
                          <Card>
                          <CardHeader>
                            <CardTitle>User Information</CardTitle>
                            <CardDescription>Details about the User {userData.phoneNumber}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <CardContent>
                            <div>
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                              </Avatar>
                              </div>

                              <div>
                              <Label htmlFor="name">Name:</Label>
                                <Input type="text" id="family" placeholder="Enter your family name" value={userData.name || ''}  />
                              </div>
                            
                              <div>
                                <Label htmlFor="family">Family:</Label>
                                <Input type="text" id="family" placeholder="Enter your family name" value={userData.family || ''}  />
                            
                              </div>
                              <div>
                                <Label htmlFor="email">Email:</Label>
                                <Input type="email" id="email" placeholder="Enter your email address" value={userData.email || ''} readOnly={!isEditing} />

                              </div>
                              
                              <div>
                              <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                >
                                  {userData.bio || ''}</Textarea>
                              </div>
                              <Separator orientation="vertical"/>
                              <Button type="submit">Edit</Button>
                              {/* <Button type="submit">Save</Button> */}
                            </CardContent>
                          </CardContent>
                          </Card>
                      ):(
                      <p>Loading User data ...</p>
                    )} 
                </div>
            </div>
        </main>
    </div>
    </RootLayout>
  )

}
