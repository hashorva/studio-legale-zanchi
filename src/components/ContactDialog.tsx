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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ContactForm
          mode="dialog"
          defaultServiceSlug={defaultServiceSlug}
          defaultExpertiseSlug={defaultExpertiseSlug}
          className="border border-border/70 shadow-none"
        />
      </DialogContent>
    </Dialog>
  );
}
