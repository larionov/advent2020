(ns advent2020.day1.part1
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(def data (->> (io/resource "day1/input.txt")
               slurp
               str/split-lines
               (map #(Integer/parseInt %))))

data

(set (for [x data
           y data
           :when (= 2020 (+ x y))]
       (* x y)))

;; => #{805731}
