'use client';

import type { ReactNode } from 'react';

import { ContactForm } from '@/components/ContactForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ContactDialogProps = {
  children: ReactNode;
  defaultServiceSlug?: string;
  defaultExpertiseSlug?: string;
  title?: string;
  description?: string;
};

export function ContactDialog({
  children,
  defaultServiceSlug,
  defaultExpertiseSlug,
  title = 'Contatti',
  description = 'Compili il modulo per inviare una richiesta. Selezionare il servizio ci aiuta a indirizzare meglio il primo contatto.',
}: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-[min(92vh,880px)] flex-col gap-0 overflow-hidden rounded-[2.5rem] p-0 pb-1 sm:max-w-3xl [&>[data-slot=dialog-close]]:top-6 [&>[data-slot=dialog-close]]:right-6 [&>[data-slot=dialog-close]]:h-10 [&>[data-slot=dialog-close]]:w-10 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-primary/10 [&>[data-slot=dialog-close]]:text-primary/60 [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:transition-all [&>[data-slot=dialog-close]]:duration-200 [&>[data-slot=dialog-close]]:hover:bg-primary/20 [&>[data-slot=dialog-close]]:hover:text-primary/90 [&>[data-slot=dialog-close]]:focus-visible:outline-none [&>[data-slot=dialog-close]]:focus-visible:ring-2 [&>[data-slot=dialog-close]]:focus-visible:ring-ring">
        <DialogHeader className="shrink-0 px-6 pt-6 pb-5 sm:px-8  bg-primary/2">
          <DialogTitle className="pr-14 font-serif text-3xl">{title}</DialogTitle>
          <DialogDescription className='mr-15'>{description}</DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <ContactForm
            mode="dialog"
            defaultServiceSlug={defaultServiceSlug}
            defaultExpertiseSlug={defaultExpertiseSlug}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
