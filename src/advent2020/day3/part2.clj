(ns advent2020.day3.part2
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

(defn get-path [[right down] height] (for [r (range height) :when (<= (* r down) height)] [(* r right) (* r down)]))

(defn count-trees-at-slope [slope field]
  (->>
   (get-path slope (count field))
   (map #(is-tree? field %))
   (filter #(= \# %))
   count))

(->>
 [[1 1] [3 1] [5 1] [7 1] [1 2]]
 (map #(count-trees-at-slope % data))
 (reduce *)
 )
;; => 1115775000
