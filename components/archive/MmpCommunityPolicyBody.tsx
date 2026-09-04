import type { ReactNode } from "react";
import Link from "next/link";
import {
  mmpCommunityPolicyMeta,
  mmpCommunityPolicySections,
} from "@/lib/mmp-community-policy";

function PolicyLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = "font-bold text-pmr-coral hover:underline";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 space-y-4 text-base leading-relaxed text-pmr-cream sm:text-lg">
      {children}
    </div>
  );
}

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-28 border-t-2 border-pmr-border pt-8 first:border-t-0 first:pt-0"
    >
      <h2
        id={headingId}
        className="text-xl font-bold text-pmr-offwhite sm:text-2xl"
      >
        <span className="font-mono text-pmr-coral">{number}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

export function MmpCommunityPolicyBody() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-5 sm:p-6">
        <p className="font-mono text-xs font-bold uppercase tracking-wide text-pmr-coral">
          Working document
        </p>
        <p className="mt-2 text-sm leading-relaxed text-pmr-cream sm:text-base">
          {mmpCommunityPolicyMeta.note}
        </p>
      </div>

      <nav
        aria-labelledby="mmp-policy-toc-heading"
        className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-5 sm:p-6"
      >
        <h2
          id="mmp-policy-toc-heading"
          className="text-lg font-bold text-pmr-offwhite"
        >
          On this page
        </h2>
        <ol className="mt-4 space-y-2">
          {mmpCommunityPolicySections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-pmr-coral hover:underline"
              >
                <span className="font-mono">{section.number}.</span>{" "}
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-5 sm:p-8">
        <div className="space-y-10">
          <PolicySection id="introduction" number={1} title="Introduction">
            <Prose>
              <p>
                This policy outlines the principles and processes that inform
                the People&apos;s Media Record&apos;s role as steward of the
                Media Mobilizing Project (MMP) Collection, in agreement with the
                interests and wishes of representatives of the MMP community.
                This document will be revised as needed in accordance with said
                interests and wishes.
              </p>
              <p>
                If you were part of MMP or any organization documented in the
                collection and you disagree with any part of this policy or with
                the sharing of specific materials, please communicate with us at{" "}
                <PolicyLink href="mailto:lila@peoplesmediarecord.com">
                  lila@peoplesmediarecord.com
                </PolicyLink>
                .
              </p>
              <p>
                In the case of the sharing of specific materials, we will
                immediately stop sharing them upon receiving your communication
                and set up a meeting to discuss your concerns.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="context" number={2} title="Context">
            <Prose>
              <p>
                In 2017, a small team began to prepare MMP&apos;s media content
                for preservation, digitizing, and cataloging over 20,000 files of
                audiovisual media from MMP&apos;s unique history, from the
                organization&apos;s emergence in 2005 to its last productions in
                2020. This collection, which we call the MMP Collection,
                consists of edited and unedited raw footage that depicts
                meetings, workshops, interviews with public figures and
                activists, and numerous political actions. There are also many
                files associated with the video and audio files, including files
                produced by video editing software, documents, transcriptions,
                spreadsheets, scripts, and even internal organizational
                documents. In total, the MMP collection includes more than
                18,000 files. For more information on the MMP Collection, see{" "}
                <PolicyLink href="/archive/mmp-collection">this page</PolicyLink>
                .
              </p>
              <p>
                As a result of this work, the People&apos;s Media Record (PMR)
                took form in 2022 as a community archive–under the fiscal
                sponsorship of Movement Alliance Project (MAP)–with the goal of
                developing as an archival and educational hub that builds power
                and capacity for Philadelphians to save and share their stories
                on their own terms. In 2023, PMR unveiled its digital archive,
                where users can find all the collection videos that MMP had
                released for public viewing and they can search through the
                metadata of more than 5000 items. In conversation with our
                Community Advisory Board, which includes former MMP staff, we
                also created a collection policy to provide guidance on how to
                balance the questions of access and privacy.
              </p>
              <p>
                Understanding the importance of these questions for the MMP
                collection, PMR continued to examine them in 2023 and 2024 with
                the legal guidance of Creative Commons, an organization that
                specializes in digital access, copyright, and privacy issues. We
                have also had a series of meetings with two former MMP leaders,
                Beckah Phillips and Bryan Mercer to share our process and to
                further orient ourselves about potential privacy concerns. We
                reached an agreement with Beckah and Bryan to create an official
                policy document to be shared with the MMP community for feedback
                and revision. This document, which we call the MMP community
                policy, shapes PMR&apos;s approach to sharing MMP collection
                materials with the public.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="intent" number={3} title="Intent">
            <Prose>
              <p>
                Centering the preferences of the communities that have
                participated in the creation of the materials in the MMP
                collection is an essential part of our approach to sharing (or
                not sharing) those materials.
              </p>
              <p>
                PMR recognizes that archives, especially when held up as
                authoritative historical records, are an important part of how
                historical narratives are created. Furthermore, we believe that
                telling the stories of our social movements, especially from
                within the most impacted communities, strengthens our continuing
                movements and communities. Who gets to tell those stories and
                how they get told have a lasting impact on how we grow as people
                and how our communities and movements grow.
              </p>
              <p>
                But we also understand, as members of the community, that media
                content can be used against us just as easily as it can be used
                to strengthen and unify our networks. In considering how to
                provide access to the MMP collection, we will prioritize the
                needs and interests of the people who created the MMP collection
                and were documented in these materials.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="privacy" number={4} title="Privacy">
            <Prose>
              <p>
                We are committed to protecting the privacy and confidentiality
                of all the individuals, groups, and organizations whose lives
                and activities are documented in these materials.
              </p>
              <p>
                With that purpose in mind, we have developed a model to
                determine what kind of access is provided to users based on the
                nature of the individual items or collections and on archiving
                best practices. According to this model, materials are
                identified according to four levels of access: open, restricted,
                private, and community.
              </p>
              <p>
                Open is for materials that document public actions and events
                and were created by MMP for the general public. Restricted is
                for materials that document private individuals or events or
                that record internal aspects of the organization. Private is
                for materials with highly sensitive information or copyright
                issues. Community is limited to people or organizations who are
                documented in MMP materials or participated in their creation.
                Below, we have an outlined detailed description of these content
                access levels.
              </p>
              <p>
                In advancing our dual goal of encouraging the use of our
                collection and safeguarding our communities from the risks of
                unlimited access, we are committed to ensuring the cataloging
                information created by MMP/PMR staff and volunteers is made as
                broadly available as possible while making sure that personal or
                sensitive data, such as videographer names, are not publicly
                released.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="open-access" number={5} title="Open Access">
            <Prose>
              <p>
                Open access is set for materials that were created by MMP for
                public consumption and shared publicly on sites such as YouTube
                and Vimeo. These materials document any action or event that is
                open to the general public on private or public property,
                including protests, speeches, civil disobedience, and lectures.
                For instance, this video is identified as open access because it
                shows a local public official, former Mayor Michael Nutter,
                performing a public action, the announcement of the new city
                budget, in City Hall.
              </p>
              <p>
                There also might be cases where private individuals have
                requested open access for recordings which they created or where
                they appear.
              </p>
              <p>
                Open access materials and their metadata are made fully
                available to all users through the PMR website. Open access
                excludes the downloading of files.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="restricted-access"
            number={6}
            title="Restricted Access"
          >
            <Prose>
              <p>
                Restricted access is used for materials created by MMP that
                document private individuals or events, internal organizational
                meetings, or interviews created for organizing or relationship
                building. Metadata for restricted materials is available on the
                website (with the exception of fields that violate individual
                privacy). Although many of these materials capture public events
                to some degree, they may also include private individuals who
                may not have consented to be showcased openly for general
                consumption.
              </p>
              <p>
                For instance, this item, which shows footage of taxi drivers
                striking against the installation of GPS in their cabs,
                documents an interview with a cab driver who did not necessarily
                consent to inclusion into a public archive.
              </p>
              <p>
                Access to the materials is subject to affirmative consent by the
                documented communities. In the case that we are unable to get a
                response from documented communities, access is based on the
                discretion of PMR staff and advisors, considering the risks
                involved in sharing the materials and the purpose for accessing
                them.
              </p>
              <p>
                Researchers and organizers may request access to materials
                identified as restricted access, which will be granted on a
                case-by-case basis. Restricted access is limited to a period of
                seven days; users may be granted renewals of restricted access
                depending on the circumstances and the amount of material they
                need to access.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="private-access" number={7} title="Private Access">
            <Prose>
              <p>
                Private access is set for materials that contain highly
                sensitive information or are otherwise inappropriate for
                sharing publicly. For example, the MMP collection includes
                documentation of the Tavis Smiley Show when it was recorded in
                Philadelphia. Aside from phone numbers, social security numbers,
                and home addresses, highly sensitive information may include
                full names, political affiliations or opinions, trade union
                membership, sexual orientation, immigration status, and other
                politically vulnerable indicators. Privacy is determined in
                dialogue with PMR advisors and the individuals that appear in
                the materials.
              </p>
              <p>
                Metadata for these materials is not made available on the
                website and the materials are reserved for access by PMR staff
                and original contributors.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="community-access"
            number={8}
            title="Community Access"
          >
            <Prose>
              <p>
                Community access is set for all community members who
                contributed to the creation of specific content: this can
                include videographers, editors, and individuals or organizations
                who were documented in MMP materials. Community members are
                granted full access to all the materials in which they were
                involved, and they should also be able to download them for
                their personal or organizational collections.
              </p>
              <p>
                All former MMP members have full access to the MMP collection in
                its totality. Use of materials under community access is limited
                to noncommercial educational and learning purposes (for our
                approach to fair use, see{" "}
                <PolicyLink href="#copyright">below</PolicyLink>).
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="copyright"
            number={9}
            title="Copyright, Fair Use, and Licensing"
          >
            <Prose>
              <p>
                According to U.S. copyright law, the copyright owners of all MMP
                collection materials are the creators or authors of the media.
                Unless they signed release forms, interviewees may also hold
                copyright over their recorded words. In the case of recorded
                performances, the artist(s) also own the rights to their
                performance.
              </p>
              <p>
                We would like to hear from any copyright owners who are not
                properly identified in this collection so we can make the
                necessary corrections. If any material here is found to violate
                copyright law, PMR will notify the contributor and take down the
                material immediately.
              </p>
              <p>
                In providing access to materials whose copyright we do not own,
                PMR believes in the practice of fair use: we strictly share
                these materials with noncommercial educational and research
                purposes in mind and with the goal of generating learning and
                critical discussion. We follow the same approach in activating
                materials through physical and digital exhibits or
                presentations. The only exception to this approach is when a
                licensing agreement explicitly enables the use of such materials
                for other purposes.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="references" number={10} title="References">
            <Prose>
              <p>
                In building this collection policy, PMR looked at a wide range
                of references and archives. In particular, we were inspired by
                the policies of the Digital Transgender Archive, African
                Activist Archives, Open Up! LGBT History Out of the Closet, and
                May Day Rooms Archive. We were also assisted by the book{" "}
                <em>
                  Copyright and Cultural Institutions: Guidelines for
                  Digitization for U.S. Libraries, Archives, and Museums
                </em>
                , by Peter B. Hirtle, Emily Hudson, and Andrew T. Kenyon, the
                Society of American Archives&apos; Code of Ethics, the
                standardized rights statements created by the
                rightsstatements.org consortium, Shlomit Yanisky-Ravid and Ben
                Zion Lahav&apos;s article &ldquo;Public Interest vs. Private
                Lives: Affording Public Figures Privacy in the Digital
                Era,&rdquo; and Victoria Anne Royal&apos;s M.A. thesis
                &ldquo;If I am Not for Myself, Who is for Me?&rdquo; An
                Examination of Legal and Ethical Considerations Concerning
                LGBTQ+ Populations and Collections in Museums.&rdquo; Last but
                not least, we have greatly benefited from the insights of the
                PMR Community Advisory Board.
              </p>
              <p>
                <PolicyLink
                  href="http://rightsstatements.org/vocab/InC-NC/1.0/"
                  external
                >
                  http://rightsstatements.org/vocab/InC-NC/1.0/
                </PolicyLink>
              </p>
            </Prose>
          </PolicySection>
        </div>
      </div>
    </article>
  );
}
