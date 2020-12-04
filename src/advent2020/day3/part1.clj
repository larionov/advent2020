(ns advent2020.day3.part1
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(def data (->> (io/resource "day3/input.txt")
               slurp
               str/split-lines))

(defn is-tree? [field [x y]] (let [height (count field)
                                   width (count (first field))
                                   x-pos (mod x width)
                                   row (nth data y)
                                   val (nth row x-pos)] val))

(defn get-path [right down height] (for [r (range height)] [(* r right) (* r down)]))

(->>
 (get-path 3 1 (count data))
 (map #(is-tree? data %))
 (filter #(= \# %))
 count)
;; => 225
