# IT znalostní báze — menší prototyp

Znalostní báze v Reactu a TypeScriptu s články, administrací a nástrojem pro e-mailové podpisy.

**Stav:** Starší/souběžná varianta znalostní báze; hlavní ukázkou širšího portálu podpory je `skolap`.

## Co projekt obsahuje

- Prohlížení článků a administrační stránky.
- Rozhraní nastavení a přihlášení.
- Generátor podpisů a datové služby Supabase.

## Technologie

React, TypeScript, Vite, Supabase.

## Architektura a struktura

- `pages/` — články, nastavení a administrace
- `services/api.ts` — metody datových služeb
- `lib/supabase.ts` — nastavitelný databázový klient
- `db_schema.sql` — databázové schéma

## Lokální vývoj

Potřebujete Node.js a npm. V kořenové složce repozitáře spusťte:

```sh
npm install
npm run dev
```

Příkaz pro sestavení uvedený v projektu: `npm run build`.

Jde o příkazy deklarované v repozitáři, nikoli o potvrzení úspěšného sestavení. Instalace závislostí, sestavení ani napojení na živé služby nebyly při úpravě dokumentace spuštěny.

## Konfigurace a omezení

Nastavení klienta Supabase se ukládá lokálně. Používejte pouze údaje určené pro prohlížeč a oprávnění vynucujte databázovými politikami. Schéma po kontrole aplikujte pouze do samostatného testovacího projektu.

## Přínos pro portfolio

Ukazuje soustředění opakovaných úloh IT podpory do společného nástroje.

## Co doplnit do dokumentace

Snímky obrazovky s fiktivními daty, opakovatelný postup ověření a přehled skutečně otestovaných integrací. Přihlašovací údaje a konfigurace konkrétního nasazení patří mimo Git.
