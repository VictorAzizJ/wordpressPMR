import type { ReactNode } from "react";
import Link from "next/link";
import {
  collectionsManagementPolicyMeta,
  collectionsManagementPolicySections,
} from "@/lib/collections-management-policy";

function PolicyLink({
  href,
  children,
  external,
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

function PolicyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-pmr-coral">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
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

function Tenet({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-pmr-coral">{title}</h3>
      <p className="mt-2">{children}</p>
    </div>
  );
}

export function CollectionsManagementPolicyBody() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-5 sm:p-6">
        <p className="font-mono text-xs font-bold uppercase tracking-wide text-pmr-coral">
          Working document
        </p>
        <p className="mt-2 text-sm leading-relaxed text-pmr-cream sm:text-base">
          First drafted {collectionsManagementPolicyMeta.drafted}. To be revised{" "}
          {collectionsManagementPolicyMeta.revisionCycle} by the Director of
          Archiving and Preservation, with support from staff and the Community
          Advisory Board.
        </p>
      </div>

      <nav
        aria-labelledby="policy-toc-heading"
        className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-5 sm:p-6"
      >
        <h2
          id="policy-toc-heading"
          className="text-lg font-bold text-pmr-offwhite"
        >
          On this page
        </h2>
        <ol className="mt-4 space-y-2">
          {collectionsManagementPolicySections.map((section) => (
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
                The Collections Management Policy governs all aspects related to
                the stewardship of the People&apos;s Media Record&apos;s
                Archive, from management, development, and preservation to its
                use and activation. Stewardship may include the acquisition and
                ownership of materials by the People&apos;s Media Record, but
                not necessarily so. We define the Archive as the collection of
                all materials managed by People&apos;s Media Record (PMR or the
                Record), including internal and administrative records.
              </p>
              <p>
                This Policy provides a system of guidelines for stewarding the
                Archive in a responsible manner, based on the{" "}
                <PolicyLink href="/about#mission-vision-values">
                  mission, vision, and principles
                </PolicyLink>{" "}
                of People&apos;s Media Record. These guidelines:
              </p>
              <PolicyList
                items={[
                  "Establish the mission of the Archive,",
                  "Explain how this mission is pursued through collection activity,",
                  "Articulate the People's Media Record's standards regarding all materials in its care,",
                  "Serves as a guide to staff and volunteers in carrying out any collection-related tasks and responsibilities, and",
                  "Inform the public about what type of material and content the Archive collects and how it stewards the Archive.",
                ]}
              />
              <p>
                The Policy was developed and drafted by{" "}
                <PolicyLink href="/about#lila-chaar-perez">
                  Lila Chaar-Pérez
                </PolicyLink>{" "}
                (Director of Archiving and Preservation) with the support of{" "}
                <PolicyLink href="/about#winter-schneider">
                  Winter Schneider
                </PolicyLink>{" "}
                (Director of Strategic Planning and Resource Mobilization) and
                Rasheed Z. Ajamu (PACME Fellowship Coordinator), and the
                organization&apos;s{" "}
                <PolicyLink href="/about#community-advisory-board">
                  Community Advisory Board (CAB)
                </PolicyLink>
                . It was written with the help of the sources found at the end
                of the document.
              </p>
              <p>
                This is a working document to be revised every three years by
                the Director of Archiving and Preservation with the support of
                the organization&apos;s staff and the CAB.
              </p>
              <p>The Policy was first drafted in November 2025.</p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="statement-of-responsibility"
            number={2}
            title="Statement of Responsibility"
          >
            <Prose>
              <p>
                The Director of Archiving and Preservation is responsible for
                the planning and implementation of all stewardship practices
                related to the Archive. These practices may be delegated to
                other staff and volunteers, but the Director bears the ultimate
                responsibility for them.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="principles-and-ethics"
            number={3}
            title="Principles and Ethics"
          >
            <Prose>
              <p>
                Aside from the organization&apos;s principles, the work of the
                People&apos;s Media Record&apos;s Archive follows the following
                three core tenets:
              </p>
              <div className="space-y-6">
                <Tenet title="Security as a practice of collective care">
                  In protecting privacy and safeguarding collection materials,
                  it prioritizes consent, transparency, and caring for one
                  another in opposition to the capitalistic policing of assets.
                </Tenet>
                <Tenet title="Integrity as a two-pronged approach">
                  Ensuring that collection materials are kept whole or in their
                  integral form; and investing in the dignity and right to
                  wholeness among the people we work with or that are documented
                  in or referred to in the Archive, incorporating their needs
                  into our work, valuing them as our peers, and practicing
                  accountability.
                </Tenet>
                <Tenet title="Sustainability from a material, social, and environmental lens">
                  Work towards the responsible long-term preservation of the
                  Archive while accepting that loss is sometimes inevitable or
                  even necessary. This involves ensuring that the Archive has
                  the required resources, capacity, and labor to implement the
                  organization and the Archive&apos;s mission. For us,
                  sustainability is not synonymous with permanence; it is
                  equivalent to securing longevity and endurance.
                </Tenet>
              </div>
              <p>
                In addition, the People&apos;s Media Record&apos;s Archive
                recognizes the{" "}
                <PolicyLink
                  href="https://www2.archivists.org/statements/saa-core-values-statement-and-code-of-ethics"
                  external
                >
                  Code of Ethics of the Society of American Archivists
                </PolicyLink>{" "}
                and the{" "}
                <PolicyLink
                  href="https://archivesforblacklives.wordpress.com/statements/"
                  external
                >
                  Statement of Principles of the Archives for Black Lives in
                  Philadelphia
                </PolicyLink>{" "}
                and supports their content to the extent that they do not
                contradict its core tenets.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="scope-and-purpose"
            number={4}
            title="Scope and Purpose"
          >
            <Prose>
              <p>
                The People&apos;s Media Record&apos;s Archive was created to
                steward the{" "}
                <PolicyLink href="/archive/mmp-collection">
                  Media Mobilizing Project (MMP) Collection
                </PolicyLink>{" "}
                and collections associated with organizations, campaigns, and
                projects adjacent or connected to MMP, specifically the
                Kensington Welfare Rights Union, Poor People&apos;s Campaign,
                New Jersey Platform, and Philly We Rise. The materials in the
                People&apos;s Media Record&apos;s Archive are primarily
                audiovisual media in digital form, including raw and edited
                video, photographic images, and social media. These materials
                constitute more than 80 terabytes of data.
              </p>
              <p>
                In addition, the Archive was created with the long-term goal of
                stewarding other materials related to the grassroots history of
                activist and movement work in Philadelphia, as exemplified by
                the Media Mobilizing Project Collection. Activist and movement
                work content is defined by the Archive to include any form of
                mobilization that denounces social injustice and aims to build
                collective power and liberation for minoritized groups, the
                working class, and the poor. Because of MMP and PMR&apos;s
                location in Philadelphia, the Archive prioritizes collections
                directly or indirectly associated with Philadelphians. However,
                the Archive is open to stewarding collections that are unrelated
                to the city but have significant overlap with movement work
                content. The Archive privileges the stewardship of digital-born
                items, videotapes, and audio cassettes, although a limited
                number of physical objects would be considered if they are
                highly relevant to a collection.
              </p>
              <p>
                Items are primarily stewarded to ensure that they are preserved
                and interpreted in agreement with the mission, values, and
                principles of People&apos;s Media Record, recognizing the
                field&apos;s best practices as well as the needs of the
                communities who own the materials or are documented in them.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="acquisitions" number={5} title="Acquisitions">
            <Prose>
              <p>
                Acquisition is the process of gaining ownership and custody over
                collection materials. Materials can be acquired through
                donations (by gift) or through purchases.
              </p>
              <p>
                Through acquisition, the Archive becomes the legal owner and
                custodian of the gifted or purchased materials. This process
                requires the documented passing of the title of ownership by the
                seller, donor, or an authorized agent to People&apos;s Media
                Record. The passing of the title should include the legal
                transferal of copyright, in addition to instructions and desires
                for how the Archive is to steward the materials going forward.
                At its discretion, the Archive may request verification of an
                item&apos;s origins and ownership in documented form. The
                Archive should confirm the legal status of materials to the best
                of its ability prior to acquisition.
              </p>
              <p>
                Once the deed of gift is signed and received, the items will be
                incorporated into the repository database with a unique
                identifier and reviewed for storage and cataloging as needed. In
                the archival profession, this process is called accessioning.
              </p>
              <p>
                The process of acquisition of all objects will be fully
                documented, and all documents related to this process, such as
                the deed of gift, will be preserved following the same
                guidelines that are used for preserving the Archive.
              </p>
              <p>
                The Archive may acquire materials from individuals, groups, or
                organizations that do not want to participate in the stewardship
                process of their materials nor to hold ownership over them. The
                Archive only acquires collections that fall within its scope and
                purpose, and it only does so with the intention of retaining
                them for the long term. The Archive should have the necessary
                resources to immediately digitize, transfer, or conserve any
                materials that are in need of it. The Archive will not acquire
                any materials for which it cannot provide proper preservation
                and stewardship.
              </p>
              <p>
                No duplicates of materials that are in the collection will be
                accepted unless they are in better condition.
              </p>
              <p>
                Although the Director of Archiving and Preservation is
                responsible for leading the acquiring of materials, all
                permanent staff are to take an active part in deciding which
                materials are to be acquired, and this decision has to be
                finally approved by PMR&apos;s Community Advisory Board.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="postcustodial-stewardship"
            number={6}
            title="Postcustodial Stewardship"
          >
            <Prose>
              <p>
                In the case that individuals, groups, or organizations retain
                ownership over their materials but want the Archive to
                participate in the stewarding of the materials, the Archive will
                follow what professional archivists call the postcustodial
                model. In this model, instead of accepting custody of materials,
                an archive borrows and stewards them based on the archiving and
                preservation needs of the owner, as stipulated in a formal
                written agreement. In order to help articulate the goals of the
                stewardship process, this document is to be created by the
                Archive through a series of conversations with the owner.
              </p>
              <p>
                The Archive will not steward any materials for which it cannot
                provide proper archiving and preservation.
              </p>
              <p>
                Although the Director of Archiving and Preservation is
                responsible for leading the process that leads to the creation
                of a postcustodial stewardship agreement, all permanent staff
                are to support the creation of the agreement and the general
                process for deciding if materials are to be stewarded and in
                what ways. This decision has to be approved by PMR&apos;s
                Community Advisory Board.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection id="removal" number={7} title="Removal">
            <Prose>
              <p>
                Removal is the process of permanently disposing or transferring
                collection items, including their metadata and other associated
                data, from the Archive.
              </p>
              <p>Collection items are removed when:</p>
              <PolicyList
                items={[
                  "There is an urgent need to create appropriate space and care for remaining items or to new collection items that are of better quality and significance.",
                  "The items no longer fit the Archive's scope and purpose.",
                  "It is discovered that collection items have a different owner and were therefore acquired illegally.",
                  "Collection owners decide to have it transferred to another repository (in the case that the Archive is solely stewarding a collection that it does not own).",
                  "They are redundant, or there are duplicates that have no clear value to the collection.",
                  "They are in a format that the Archive cannot support anymore, and they cannot be converted to another format.",
                  "They have suffered extensive damage that the Archive cannot fix.",
                ]}
              />
              <p>
                All items proposed for removal from the Archive must be subject
                to a thorough review. The decision to remove materials must be
                made only after deliberate consideration of the needs of the
                Archive&apos;s users, communities associated with the materials,
                the general public, and the donor&apos;s intent. Removal must be
                approved by the rest of the team and CAB members.
              </p>
              <p>
                Removal cannot violate any stipulations included by the donor in
                the deed of gift or by the collection owner in the stewarding
                contract, unless adherence to these stipulations is impossible.
                The impossibility of adherence should then be clearly
                demonstrated to the donor or owner.
              </p>
              <p>
                When possible, objects that are recommended for removal will be
                transferred to an archive or repository that the donor or owner
                deems appropriate. No transfers will be made to non-profit
                institutions. Disposal or destruction of items will happen only
                when the owner requires it.
              </p>
              <p>
                The procedure of removal shall be documented fully in the
                Archive&apos;s records.
              </p>
              <p>
                The Director of Archiving and Preservation is responsible for
                considering and proposing objects for removal every three years.
              </p>
            </Prose>
          </PolicySection>

          <PolicySection
            id="collections-care"
            number={8}
            title="Collections Care"
          >
            <Prose>
              <p>
                The Archive will ensure that all collection items are taken care
                of in a sustainable manner for the long term, safeguarding them
                from loss, destruction, and degradation to the best of our
                capacity and according to the wishes of the donor and owner. The
                Director of Archiving and Preservation is responsible for all
                care and preservation activities, in coordination with other
                staff and volunteers, as applicable. Besides what is mentioned
                in other sections of this policy, the Archive&apos;s main
                responsibilities in collection care are:
              </p>
              <PolicyList
                items={[
                  'Maintaining a comprehensive preservation program that takes into consideration the best practices of the field, but also follows what is "good enough" for preserving collection items, with the Archive\'s capacity in mind.',
                  "Take measures to prevent the theft, vandalism, destruction or damage by pests, fire, water, or other elements.",
                  "Maintaining appropriate storage conditions for all objects through storage in our servers and backups in the cloud, and in LTO tapes. Internal records are stored in the cloud and will be backed up weekly in the cloud and yearly in LTO tapes.",
                  "Monitoring of all collection objects in servers to ensure their integrity and authenticity, and replace them with backups when loss or deterioration has been detected.",
                  "Plan for all necessary maintenance and management of the devices, software, and supplies required to operate the Archive in a secure, integral, and sustainable manner. This plan should consider not only budgeting for replacements, subscriptions, expansions, and labor as needed, but also staff capacity.",
                  "Establish appropriate safety measures, including pest detection and removal, environmental control, and emergency preparedness and response procedures.",
                  "Perform routine floor inspections to ensure a secure building envelope and alleviate structural or environmental concerns.",
                  "Perform a regular risk assessment of all areas where the Archive is located.",
                  "Ensure the protection of all collections and spaces related to the Archive from vandalism, criminal activity, and accidents.",
                  "Ensure that objects are handled appropriately.",
                ]}
              />
            </Prose>
          </PolicySection>

          <PolicySection
            id="access-and-privacy"
            number={9}
            title="Access and Privacy"
          >
            <Prose>
              <p>
                The Archive recognizes that archives play an important role in
                how certain historical narratives are created, shaped, and
                shared while other stories, particularly those pertaining to
                historically oppressed communities, are silenced, erased, or
                captured to build institutional capital. With this in mind, the
                Archive makes its collections accessible to the public for
                education, research, exhibition, and reproduction according to
                the wishes of the owner, donor, and the communities depicted and
                documented in collection items. The Archive balances the
                imperative to provide access with two central goals:
                safeguarding the Archive&apos;s collections and protecting the
                privacy and confidentiality of the individuals, groups, and
                organizations that form part of the stories that are told
                through the Archive. All decisions related to access and privacy
                follow the mission, vision, and principles of People&apos;s
                Media Record.
              </p>
              <p>
                For materials that are not publicly accessible through our
                website, users must complete an{" "}
                <PolicyLink href="/access-request">access form</PolicyLink> in
                order to view the items. In this form, users are expected to
                share their intentions in accessing materials as well as who
                they are, what organization, group, or institution they belong
                to or work for, if any, and other relevant aspects about who
                they are and what they do. Access will be provided on a case by
                case basis; it will not be granted to users who intend to
                reproduce materials for commercial use or whose ideas and
                practices do not align with the organization&apos;s mission,
                vision, and principles.
              </p>
              <p>
                When possible, each collection within the Archive has its own
                specific policy regarding access, use, and privacy, created
                jointly between the Director of Archiving and Preservation (with
                support from staff and the Community Advisory Board) and
                collection owners, created exclusively by the owners, or created
                exclusively by the Director (with support from staff and the
                Community Advisory Board). An example of a specific policy is
                the Media Mobilizing Project Collection&apos;s{" "}
                <PolicyLink href="/archive/mmp-community-policy">
                  community policy
                </PolicyLink>
                . In the case that there is no specific policy, the Archive
                defaults to our general access policy as outlined here.
              </p>
              <p>
                The Archive ensures that all descriptive information (metadata)
                for collection items is publicly accessible and that all
                personal or sensitive data is not publicly released. For more on
                our metadata practice, please see our Metadata Overview.
              </p>
              <p>
                Any reproduction and publication of copyrighted material will be
                limited to non-commercial or education purposes and governed by
                U.S. copyright law as stated in Title 17. If interested in
                reproduction and publication, users are required to share their
                intention.
              </p>
              <p>
                In granting permission to publish material obtained from the
                Archive, the Archive does not assume responsibility for
                infringement of copyright or of publication rights of material
                that may be held by others. The publisher assumes all
                responsibility for claims under the Copyright Law of the United
                States or for libel claims resulting from publication. The
                publisher agrees to credit the organization:{" "}
                <cite className="not-italic text-pmr-offwhite">
                  &ldquo;Courtesy of the People&apos;s Media Record.&rdquo;
                </cite>
              </p>
              <p>
                It is the Director of Archiving and Preservation&apos;s
                responsibility to determine whether collection materials are in
                the public domain or are protected by copyright. A statement of
                permission must be obtained from the holder of the rights, and
                proper credits given, for all reproductions that are not the
                intellectual property of People&apos;s Media Record. The
                responsibility for obtaining additional permission required for
                the publication of collections remains with the publisher of the
                material.
              </p>
              <p>
                All procedures related to users accessing collections will be
                fully documented and preserved in the Archive&apos;s internal
                records.
              </p>
            </Prose>
          </PolicySection>
        </div>
      </div>
    </article>
  );
}
