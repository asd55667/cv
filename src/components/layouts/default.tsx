import type { Component } from 'solid-js';

import styles from './default.module.css'
import Header from '../header/header';
import { Contact } from '../contact/Contact';
import { Education } from '../education/Education';
import { LightBlock } from '../block/Block';
import { Experience } from '../experience/Experience';

export const DefaultLayout: Component = (props) => {
    return (
        <main class={styles.page}>
            <Header />

            <div class='flex items-start justify-between flex-grow pl-10'>
                <div class="flex flex-col gap-9 mt-22px">
                    <Contact />

                    <Education />

                    <LightBlock label="expertise">
                        <div class="flex flex-col justify-center gap-1">
                            <li>Branding</li>
                            <li>Web Design</li>
                            <li>UI/UX Design</li>
                            <li>Web Development</li>
                        </div>
                    </LightBlock>

                    <LightBlock label="skills">
                        <div class="flex flex-col justify-center gap-1">
                            <li>Lead & Strategy</li>
                            <li>Innovative</li>
                            <li>Team work</li>
                            <li>Goal oriented</li>
                        </div>
                    </LightBlock>
                </div>

                <div class={styles.right}>
                    <LightBlock label='about me'>
                        <div class="pb-2 border-b-[#E5E5EA]">Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque sit senectus maecenas donec amet viverra Aliquam aenean eget gravida vitae nunc vitae sit.</div>
                    </LightBlock>

                    <LightBlock
                        label={
                            <div>work <span class='highlight'>experience</span></div>
                        }
                    >
                        <div class="flex flex-col gap-30px">
                            <Experience title="Facebook" position="Lead Product Designer" date="2019 - Present">
                                Eleifend volutpat sit eros, lobortis id lobortis placerat volutpat penatibus purus vestibulum id proin in eros a. Justo.
                            </Experience>

                            <Experience title="Youtube" position="Lead Product Designer" date="2018 - 2019">
                                Ultrices proin elit, tellus euismod. Leo id volutpat cursus integer faucibus ultrices. Convallis ipsum eu adipiscing lorem.
                            </Experience>

                            <Experience title="Twitter" position="Lead Product Designer" date="2017 - 2018">
                                Etiam commodo vulputate aliquam urna ac lacus. Sagittis arcu pulvinar ullamcorper ut. Blandit vel felis etiam.
                            </Experience>

                            <Experience title="Google" position="Lead Product Designer" date="2016 - 2017">
                                Sed feugiat aliquam pharetra, consequat, volutpat pharetra sagittis tortor. Elementum proin arcu quisque adipiscing.
                            </Experience>
                        </div>
                    </LightBlock>

                </div>
            </div>


            {/* <footer>
                footer
            </footer> */}
        </main>
    )
}
