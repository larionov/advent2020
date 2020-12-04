(ns advent2020.day1.part2
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(def data (->> (io/resource "day1/input.txt")
               slurp
               str/split-lines
               (map #(Integer/parseInt %))))

(set (for [x data
           y data
           z data
           :when (= 2020 (+ x y z))]
       (* x y z)))
;; => #{192684960}
