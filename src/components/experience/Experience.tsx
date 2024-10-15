import { type JSX, type Component } from 'solid-js';

import styles from './experience.module.css'

interface IExperience {
    title: string
    position: string
    date: string
    children: JSX.Element
}

export const Experience: Component<IExperience> = (props) => {
    return (
        <div class="lt4">
            <div class="lt3 highlight">{props.title}</div>

            <div class="mt-12.7px mb-2">
                <span class="lt2  pr-6px mr-6px border-r-red">{props.position}</span>
                <span class={styles.date}>{props.date}</span>
            </div>

            <div>{props.children}</div>
        </div>
    )
}
