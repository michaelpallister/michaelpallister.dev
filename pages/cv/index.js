import Head from 'next/head';

const CV = () => {
  return (
    <>
      <Head>
        <title>
          CV | Michael Pallister | Frontend Developer | michaelpallister.dev
        </title>
      </Head>
      <main className='container'>
        <h1 className='heading mb-8'>CV</h1>
        <section className='job'>
          <h2 className='job__title'>Stinkyink - Senior Frontend Developer</h2>
          <p className='job__date'>January 2022 - Present</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            aperiam alias, itaque reiciendis ab dicta amet fugit fugiat
            similique aut, ea quibusdam ex repellendus. Sit vero veniam corporis
            minima. Omnis.
          </p>
        </section>
        <section className='job'>
          <h2 className='job__title'>
            Northern Stable - Senior Frontend Developer
          </h2>
          <p className='job__date'>June 2021 - December 2022</p>
          <p>Helping people and companies take their ideas to market.</p>
          <p>
            Our recent product launches include the UK's fastest growing digital
            appointments app, a referral network and a video email SaaS.
          </p>
          <p>
            Alongside these, I'm also tasked with supporting the other
            businesses we've helped build with their frontend needs. Whether it
            be a feature that needs building, any consultation and planning of
            upcoming features, API design or any general questions they have.
          </p>
        </section>
        <section className='job'>
          <h2 className='job__title'>CookiesHQ - Senior Frontend Developer</h2>
          <p className='job__date'>March 2021 - June 2021</p>
          <p>
            I worked on a range of products whilst working at Cookies. Most
            notable are:
          </p>
          <p>Helped build an interactive video platform called Stornoway.io.</p>
          <p>
            Working with the BBC to develop the BBC Maestro video content
            platform.
          </p>
          <p>
            Created the initial MVP of a senior citizen monitoring health app,
            named Amba and the iOS app alongside it.
          </p>
        </section>
        <section className='job'>
          <h2 className='job__title'>CEF - Senior Frontend Developer</h2>
          <p className='job__date'>May 2017 - March 2021</p>
          <p>
            I helped the business transition its presence online from a B2B only
            company to a B2B/B2C company.
          </p>
          <p>
            Being the largest electrical wholesaler in the UK we had to ensure
            that the change wouldn't cause any issues for our existing business
            customers, whilst fulfilling the demands and expectations of your
            average customer.
          </p>
          <p>
            My role involved a lot of performance work, focussing on driving
            down the page size, increasing the speed and optimising the user
            journey so that we could get customers through the whole funnel
            quicker.
          </p>
          <p>
            I was also responsible for starting the frontend component library,
            which would make development time quicker. Part of my role involved
            mentoring junior developers, as well as helping the wider
            developers/testers in the team with any queries they had.
          </p>
          <p>
            Before leaving, I was also part of a small team that was tasked with
            a massive technical upgrade across the whole stack.
          </p>
        </section>
        <section className='job'>
          <h2 className='job__title'>Visualsoft - Senior Frontend Developer</h2>
          <p className='job__date'>April 2013 - May 2017</p>
          <p>
            Working as part of the R&amp;D team I was responsible for pushing
            the frontend of the codebase forward. Trying to always be ahead of
            the curve in e-commerce and giving the clients access to features
            they needed before they knew they needed them.
          </p>
          <p>
            I helped build the companies first responsive website, which then
            led to re-writing the bulk of the component library to be
            responsive.
          </p>
          <p>
            I was also part of a small team that rolled out the coding standards
            documentation to the company for all developers and responsible for
            checking all frontend code that was going into the codebase met the
            standards we had outlined.
          </p>
        </section>
        <section className='job'>
          <h2 className='job__title'>Teesside University - Web Developer</h2>
          <p className='job__date'>September 2012 - April 2013</p>
          <p>
            I was responsible for maintaining and developing the University
            website, across the full-stack.
          </p>
          <p>
            I was responsible for creating prototypes for features which would
            then be turned into designs before I would eventually build them.
          </p>
          <p>
            Alongside this, I was helping build a custom CMS to make it easier
            for other internal departments to update their area's of the
            website.
          </p>
          <p>
            I was also responsible for creating internal tooling, allowing
            departments to visualise the data we were collecting on the site
            quicker and easier.
          </p>
        </section>
        <section className='job'>
          <h2 className='job__title'>Visualsoft - Web Developer</h2>
          <p className='job__date'>Jul 2010 - September 2012</p>
          <p>
            Initially, my role was split between frontend work and helping out
            in the new in the technical support team, dealing with existing
            client bugs and dealing with their queries.
          </p>
          <p>
            I helped build the customer knowledge base, allowing customers to
            search for their question before submitting them. This ended up
            cutting the number of duplicate requests we had down drastically.
          </p>
          <p>
            Working in the frontend team I was creating sites from PSDs supplied
            by the designers. I noticed a lot of repeat components and started
            to document these. This led to me being moved from the support role
            into a role where I was helping build out the component library
            which would then be used by all developers to cut down the build
            time of any site.
          </p>
          <h3 className='mb-2 font-medium'>Tech Stack:</h3>
          <ul className='tags'>
            <li className='tag'>HTML</li>
            <li className='tag'>CSS</li>
            <li className='tag'>Javascript</li>
            <li className='tag'>jQuery</li>
            <li className='tag'>PHP</li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default CV;
