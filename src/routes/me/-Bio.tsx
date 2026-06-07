import { Button } from '@/components/ui/button.tsx'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field.tsx'
import { Slider } from '@/components/ui/slider.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { upperFirst } from 'es-toolkit'
import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

const BIOS = [
  '{Matt Powell} {is} an improvisor based in {Te Whanganui-a-Tara}, {Aotearoa}.',
  '{Matt Powell} {is} an improvisor, director, and teacher based in {Te Whanganui-a-Tara}, {Aotearoa}.',
  '{Matt Powell} {is} an improvisor, director, and teacher based in {Te Whanganui-a-Tara}, {Aotearoa}. With more than 25 years of experience, {he} {performs} and {teaches} regularly around {Aotearoa} and Australia. {He} {is} a founding member of Locomotive and Late Night Knife Fight, and a former Artistic Co-Director of the New Zealand Improv Festival.',
  '{Matt Powell} {is} an improvisor, director, and teacher based in {Te Whanganui-a-Tara}, {Aotearoa}. A veteran of {Ōtautahi}’s Court Jesters, {he} {has} been performing and teaching improvisation for more than 25 years. {He} {is} a founding member of Locomotive and Late Night Knife Fight, a tutor with the Pōneke Youth TheatreSports™ programme, and a regular performer and teacher at festivals throughout {Aotearoa} and Australia. From 2023–2025, {he} served as Artistic Co-Director of the New Zealand Improv Festival.',
  '{Matt Powell} {has} been performing, directing, and teaching improvisation for over 25 years. A veteran of {Ōtautahi}’s Court Jesters, {he} {is} now based in {Te Whanganui-a-Tara}, where {he} {is} a founding member of Locomotive and Late Night Knife Fight, and a tutor with the Pōneke Youth TheatreSports™ programme. {He} {is} a regular performer and teacher at festivals throughout {Aotearoa} and Australia, and served as Artistic Co-Director of the New Zealand Improv Festival from 2023–2025. A strong physical improviser with a flair for language and a wealth of arcane trivia, {Matt} {is} equally at home in an absurd high-concept scene or hosting a show as an MC.',
] as const

type BioOptions = {
  pronouns: boolean
  thirdPerson: boolean
  coloniser: boolean
}

type Replacer = (str: string, options: BioOptions) => string

const REPLACEMENTS: Record<string, Replacer> = {
  'matt powell': (_str, options) =>
    options.thirdPerson
      ? `Matt Powell${options.pronouns ? ' (he/him)' : ''}`
      : 'I',
  matt: (_str, options) => (options.thirdPerson ? 'Matt' : 'I'),
  ōtautahi: (_str, options) =>
    options.coloniser ? 'Christchurch' : 'Ōtautahi',
  'te whanganui-a-tara': (_str, options) =>
    options.coloniser ? 'Wellington' : 'Te Whanganui-a-Tara',
  aotearoa: (_str, options) => (options.coloniser ? 'New Zealand' : 'Aotearoa'),
  he: (str, options) => matchCase(str, options.thirdPerson ? 'he' : 'I'),
  has: (str, options) => matchCase(str, options.thirdPerson ? 'has' : 'have'),
  is: (str, options) => matchCase(str, options.thirdPerson ? 'is' : 'am'),
  performs: (str, options) =>
    matchCase(str, options.thirdPerson ? 'performs' : 'perform'),
  teaches: (str, options) =>
    matchCase(str, options.thirdPerson ? 'teaches' : 'teach'),
}

const generateBio = (length: number, options: BioOptions) => {
  const raw = BIOS[length] ?? BIOS[BIOS.length - 1]
  const replaced = raw.replaceAll(/\{([^}]+)\}/g, (_, key) => {
    const replacer = REPLACEMENTS[key.toLocaleLowerCase()]
    return replacer?.(key, options) ?? key
  })
  return replaced
}

const countWords = (str: string) => {
  return Array.from(str.matchAll(/\b\w+\b/g) ?? []).length
}

export const Bio = () => {
  const [length, setLength] = useState(50)
  const [pronouns, setPronouns] = useState(true)
  const [thirdPerson, setThirdPerson] = useState(true)
  const [coloniser, setColoniser] = useState(false)

  const bio = useMemo(() => {
    const choice = Math.round((length * (BIOS.length - 1)) / 100)
    return generateBio(choice, { pronouns, thirdPerson, coloniser })
  }, [length, pronouns, thirdPerson, coloniser])

  const shortCount = useMemo(
    () => countWords(generateBio(0, { pronouns, thirdPerson, coloniser })),
    [pronouns, thirdPerson, coloniser],
  )
  const longCount = useMemo(
    () =>
      countWords(
        generateBio(BIOS.length - 1, { pronouns, thirdPerson, coloniser }),
      ),
    [pronouns, thirdPerson, coloniser],
  )

  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(bio)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="grid md:grid-cols-[1fr_2fr] gap-4 items-stretch">
        <FieldGroup className="contents">
          <FieldSet className="panel p-6 rounded-lg">
            <h2>Bio generator</h2>
            <Field className="grid grid-cols-[auto_auto] gap-2">
              <FieldLabel className="contents">
                <span>{`Short (~${shortCount}\xa0words)`}</span>
                <span className="justify-self-end text-right">{`Long (~${longCount}\xa0words)`}</span>
              </FieldLabel>
              <FieldContent className="col-span-2">
                <Slider
                  min={0}
                  max={100}
                  value={[length]}
                  onValueChange={(value) =>
                    setLength(Array.isArray(value) ? value[0] : value)
                  }
                />
              </FieldContent>
            </Field>
            <div className="grid grid-cols-[auto_1fr] grid-flow-row-dense gap-y-2 gap-x-4 **:data-[slot=field-content]:col-start-1 **:data-[slot=field-label]:col-start-2">
              <Field className="contents">
                <FieldLabel>Third Person</FieldLabel>
                <FieldContent>
                  <Switch
                    checked={thirdPerson}
                    onCheckedChange={setThirdPerson}
                  />
                </FieldContent>
              </Field>
              <Field className="contents">
                <FieldLabel>Pronouns</FieldLabel>
                <FieldContent>
                  <Switch
                    checked={thirdPerson ? pronouns : false}
                    onCheckedChange={setPronouns}
                    disabled={!thirdPerson}
                  />
                </FieldContent>
              </Field>
              <Field className="contents">
                <FieldLabel>English placenames</FieldLabel>
                <FieldContent>
                  <Switch checked={coloniser} onCheckedChange={setColoniser} />
                </FieldContent>
              </Field>
            </div>
          </FieldSet>
        </FieldGroup>
        <div className="panel-inverse grid grid-rows-[1fr_auto] gap-2 p-6">
          <p className="text-md md:text-lg lg:text-xl xl:text-2xl">{bio}</p>
          <div>
            <Button onClick={copyToClipboard}>
              {copied ? (
                <>
                  <CheckIcon className="size-4 sketchy" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardIcon className="size-4 sketchy" />
                  <span>Copy to clipboard</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const matchCase = (oldStr: string, newStr: string) => {
  if (upperFirst(oldStr) === oldStr) return upperFirst(newStr)
  return newStr
}
