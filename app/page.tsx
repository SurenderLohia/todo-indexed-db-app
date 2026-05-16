import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left">Todo</h1>
        <div className="flex gap-1 w-full mt-4">
          <Input />
          <Button>Add</Button>
        </div>
      </main>
    </div>
  );
}
